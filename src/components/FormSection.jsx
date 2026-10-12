export default function FormSection({ title, description, children }) {
  return (
    <section className="form-section">
      <div className="section-heading">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {children}
    </section>
  );
}
