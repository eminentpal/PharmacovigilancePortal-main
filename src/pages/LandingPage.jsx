import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="landing">
        <div className="hero-copy">
          <p className="eyebrow">PHARMACOVIGILANCE REPORTING</p>
          <h1>Every report helps make care safer.</h1>
          <p className="lead">
            Submit a suspected adverse reaction securely with a clear, guided
            reporting form designed for healthcare professionals.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/report">
              Fill adverse reaction form <span>→</span>
            </Link>
            <a className="text-link" href="#how-it-works">
              How it works
            </a>
          </div>
        </div>
        <aside className="hero-card">
          <div className="card-icon">✓</div>
          <h2>Clear reporting, better follow-up</h2>
          <p>
            Your report captures the clinical details needed to support
            pharmacovigilance review.
          </p>
          <div className="card-step">
            <span>01</span> Add patient and reaction details
          </div>
          <div className="card-step">
            <span>02</span> Record suspected drug information
          </div>
          <div className="card-step">
            <span>03</span> Submit securely for review
          </div>
        </aside>
      </main>
      <section id="how-it-works" className="process">
        <p className="eyebrow">THE PROCESS</p>
        <h2>A straightforward reporting experience</h2>
        <div className="process-grid">
          <article>
            <b>1</b>
            <h3>Complete the form</h3>
            <p>
              Enter the reaction, outcome, and medicine details from the case.
            </p>
          </article>
          <article>
            <b>2</b>
            <h3>Review your report</h3>
            <p>Required information is checked before you submit.</p>
          </article>
          <article>
            <b>3</b>
            <h3>Submit for review</h3>
            <p>We confirm when your report has been received successfully.</p>
          </article>
        </div>
      </section>
    </>
  );
}
