import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Layout = (props) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
  <>
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" className="navbar-brand font-weight-bold">
          Currency Exchange
        </Link>
        <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            
              <Link to="/" className="nav-link">Home</Link>
            
            
              <Link to="/swapper" className="nav-link">Currency Swapper</Link>
            
          </ul>
        </div>          
      </div>        
    </nav>
    <div id="container" className="container my-4 py-4">
      {props.children}
    </div>
    <footer className="p-3 bg-dark">
      <div className="d-flex justify-content-center">
          <span className="text-secondary">Developed by <a className="text-light" href="https://www.linkedin.com/in/cesar-eduardo-poumian-orozco-407020b6/">Cesar Poumian</a></span>
      </div>
    </footer>
  </>
  );
}

export default Layout;