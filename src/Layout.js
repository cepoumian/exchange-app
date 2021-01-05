import React from 'react';
import { Link } from 'react-router-dom';

const Layout = (props) => {
  return (
  <>
    <nav className="navbar bg-dark navbar-expand-lg">
        <Link to="/" className="logo navbar-brand font-weight-bold">
          Currency Exchange
        </Link>
        <Link to="/swapper">Currency Swapper</Link>       
    </nav>
    <div className="container my-4 py-4">
      {props.children}
    </div>
    <footer className="p-3 bg-dark">
      <div>
        <span className="text-secondary">Developed by Cesar Poumian</span>
      </div>
    </footer>
  </>
  );
}

export default Layout;