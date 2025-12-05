import React from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import the pages we just created
import Home from './pages/Home';
import About from './pages/About';
import Donate from './pages/Donate';
import OurWork from './pages/OurWork';

function App() {
  return (
    <Router>
      {/* Navigation Bar - Stays at the top of every page */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">My NGO</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
             <ul className="navbar-nav ms-auto">
                <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/work">Our Work</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/donate">Donate</Link></li>
             </ul>
          </div>
        </div>
      </nav>

      {/* Routes - Switches content based on the URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work" element={<OurWork />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
}

export default App;