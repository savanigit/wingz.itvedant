import React from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <h2 className="text-center fw-bold mb-5">Contact Us</h2>
      
      <div className="row g-4">
        {/* Contact Info & Map */}
        <div className="col-12 col-lg-5 mb-4">
          <div className="p-4 bg-light rounded shadow-sm h-100">
            <h4 className="mb-4">Get in Touch</h4>
            <p><strong>Address:</strong><br />123 NGO Street, Social Welfare Area,<br />New Delhi, India - 110001</p>
            <p><strong>Phone:</strong><br />+91 98765 43210</p>
            <p><strong>Email:</strong><br />contact@myngo.org</p>
            
            <hr className="my-4" />
            
            {/* Placeholder for Map */}
            <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded" style={{height: '200px', minHeight: '150px'}}>
              Map goes here (Google Maps Embed)
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-12 col-lg-7">
          <div className="card border-0 shadow-lg">
            <div className="card-body p-3 p-md-5">
              <h4 className="card-title mb-4">Send us a message</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" placeholder="John Doe" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <select className="form-select">
                    <option>General Inquiry</option>
                    <option>Volunteer</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea className="form-control" rows="4" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2">Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;