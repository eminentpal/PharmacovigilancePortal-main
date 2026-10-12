import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required,
  hint,
  placeholder = "Search and select an option",
}) {
  const id = `field-${name}`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const containerRef = useRef(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return options;
    return options.filter((option) => option.toLowerCase().includes(term));
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const handleClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const commit = (option) => {
    onChange({ target: { name, value: option } });
    setOpen(false);
    setQuery("");
  };

  const displayValue = open ? query : value ?? "";

  const handleChange = (event) => {
    setQuery(event.target.value);
    setHighlight(0);
    if (!open) setOpen(true);
  };

  const handleFocus = () => {
    setOpen(true);
    setQuery("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setHighlight((current) => Math.min(current + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => Math.max(current - 1, 0));
    } else if (event.key === "Enter") {
      if (open && filtered[highlight]) {
        event.preventDefault();
        commit(filtered[highlight]);
      }
    } else if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div
      className={`field ${error ? "has-error" : ""}`}
      ref={containerRef}
    >
      <label htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {hint && <span className="hint">{hint}</span>}
      <div className="searchable-select">
        <input
          id={id}
          name={name}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          autoComplete="off"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        {open && (
          <ul className="searchable-select-list" id={`${id}-list`} role="listbox">
            {filtered.length === 0 ? (
              <li className="searchable-select-empty">No matches found</li>
            ) : (
              filtered.map((option, index) => (
                <li
                  key={option}
                  role="option"
                  aria-selected={option === value}
                  className={`searchable-select-option ${
                    index === highlight ? "is-highlighted" : ""
                  }`}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    commit(option);
                  }}
                  onMouseEnter={() => setHighlight(index)}
                >
                  {option}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
