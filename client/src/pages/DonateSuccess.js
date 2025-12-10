import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function DonateSuccess() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <div className="text-center" style={{minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <div className="card shadow p-5 mx-auto" style={{maxWidth: '600px'}}>
        <div className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="green" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        </div>
        <h2 className="text-success fw-bold">Thank You for Your Donation!</h2>
        <p className="lead mt-3">
          Your transaction was successful. A receipt has been sent to your email.
        </p>
        <p className="text-muted">
          Your support helps us bring change to those who need it most.
        </p>
        
        <div className="mt-4">
          <p className="fw-bold">Share your support:</p>
          <button className="btn btn-primary me-2 btn-sm">Share on Facebook</button>
          <button className="btn btn-info text-white me-2 btn-sm">Share on Twitter</button>
          <button className="btn btn-success btn-sm">Share on WhatsApp</button>
        </div>

        <div className="mt-5">
          <Link to="/" className="btn btn-outline-dark">Return to Home</Link>
        </div>
      </div>
      </div>
    </div>
  );
}

export default DonateSuccess;