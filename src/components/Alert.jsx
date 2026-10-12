export default function Alert({ kind, title, children, onDismiss }) {
  return (
    <div className={`alert alert-${kind}`} role="alert">
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
      <button
        className="icon-button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
