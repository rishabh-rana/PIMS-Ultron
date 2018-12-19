import React from "react";

import { Link } from "react-router-dom";

const Header = props => {
  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand" disabled>
        PIMS-Ultron
      </span>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item d-inline-block">
          <Link to="/create" className="nav-link d-inline-block">
            Create
          </Link>
        </li>
        <li className="nav-item d-inline-block">
          <Link to="/submit" className="nav-link d-inline-block">
            Submit
          </Link>
        </li>
        <li className="nav-item d-inline-block">
          <Link to="/view" className="nav-link d-inline-block">
            View
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
