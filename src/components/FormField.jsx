export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  hint,
  options,
  ...props
}) {
  const id = `field-${name}`;
  const shared = {
    id,
    name,
    value: value ?? "",
    onChange,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    ...props,
  };
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {hint && <span className="hint">{hint}</span>}
      {options ? (
        <select {...shared}>
          <option value="">Select an option</option>
          {options.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea {...shared} />
      ) : (
        <input type={type} {...shared} />
      )}
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}
