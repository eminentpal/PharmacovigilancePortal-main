import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <img
            className="logoimage"
            src="assets/fidsonlogo.png"
            alt="fidson logo"
          />
          +
        </span>
        <span>
          <h3 className="brandname">
            Pharmacovigilance
            <span className="brand-light">Portal</span>
          </h3>
        </span>
      </Link>
      {pathname !== "/report" && (
        <Link className="nav-link" to="/report">
          Report a reaction
        </Link>
      )}
    </header>
  );
}
