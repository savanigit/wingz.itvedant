import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function GetInvolved() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <h1 className="text-center fw-bold mb-5">Get Involved</h1>

      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h3 className="text-primary">Volunteer With Us</h3>
          <p>
            Join our team of dedicated volunteers. Whether you can teach, organize events, 
            or provide medical aid, your time can change lives.
          </p>
          <button className="btn btn-outline-primary">Fill Volunteer Form</button>
        </div>
        <div className="col-md-6">
          <div className="p-5 bg-light rounded text-center">
            [Image: Volunteers Working]
          </div>
        </div>
      </div>

      <hr />

      <div className="row align-items-center my-5">
        <div className="col-md-6 order-md-2">
          <h3 className="text-success">Partner With Us</h3>
          <p>
            We collaborate with corporate partners (CSR) and other NGOs to maximize impact. 
            Let's build a better future together.
          </p>
          <button className="btn btn-outline-success">Contact Partnership Team</button>
        </div>
        <div className="col-md-6 order-md-1">
          <div className="p-5 bg-light rounded text-center">
            [Image: Handshake/Partnership]
          </div>
        </div>
      </div>

      <div className="text-center mt-5 p-5 bg-warning rounded">
        <h2>Donate to our Cause</h2>
        <p className="lead">Your contribution ensures no child goes to bed hungry.</p>
        <Link to="/donate" className="btn btn-dark btn-lg mt-2">Donate Now</Link>
      </div>
    </div>
  );
}

export default GetInvolved;