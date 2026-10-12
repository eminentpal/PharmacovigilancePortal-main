export default function CheckGroup({ label, options, selected, onToggle }) {
  return (
    <fieldset className="check-group">
      <legend>{label}</legend>
      <div>
        {options.map((item) => {
          const isSelected = selected === item;
          const hasSelection = Boolean(selected);

          return (
            <label className="check-option" key={item}>
              <input
                type="checkbox"
                checked={isSelected}
                disabled={hasSelection && !isSelected}
                onChange={() => onToggle(item)}
              />
              <span>{item}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
