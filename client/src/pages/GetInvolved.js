import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GetInvolved() {
  const navigate = useNavigate();
  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
  });
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/volunteers/', volunteerForm);
      alert('Thank you for your interest! We will contact you soon.');
      setShowVolunteerModal(false);
      setVolunteerForm({ name: '', email: '', phone: '', skills: '', availability: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <h1 className="text-center fw-bold mb-5">Get Involved</h1>

      {/* Volunteer Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h3 className="text-primary">1. Volunteer With Us</h3>
          <p>
            Join our team of dedicated volunteers. Whether you can teach, organize events, 
            or provide medical aid, your time can change lives.
          </p>
          <button 
            className="btn btn-outline-primary"
            onClick={() => setShowVolunteerModal(true)}
          >
            Fill Volunteer Form
          </button>
        </div>
        <div className="col-md-6">
          <div className="p-5 bg-light rounded text-center">
            <img 
              src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=500&q=60" 
              alt="Volunteers" 
              className="img-fluid rounded"
              style={{maxHeight: '200px', objectFit: 'cover', width: '100%'}}
            />
          </div>
        </div>
      </div>

      <hr />

      {/* Partner Section */}
      <div className="row align-items-center my-5">
        <div className="col-md-6 order-md-2">
          <h3 className="text-success">2. Partner With Us</h3>
          <p>
            We collaborate with corporate partners (CSR) and other NGOs to maximize impact. 
            Let's build a better future together.
          </p>
          <button 
            className="btn btn-outline-success"
            onClick={() => navigate('/contact')}
          >
            Contact Partnership Team
          </button>
        </div>
        <div className="col-md-6 order-md-1">
          <div className="p-5 bg-light rounded text-center">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=500&q=60" 
              alt="Partnership" 
              className="img-fluid rounded"
              style={{maxHeight: '200px', objectFit: 'cover', width: '100%'}}
            />
          </div>
        </div>
      </div>

      <hr />

      {/* Fundraise Section */}
      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <h3 className="text-warning">3. Start a Fundraiser</h3>
          <p>
            Individuals can start their own fundraising campaigns in support of our projects. 
            Use your network to make a bigger impact!
          </p>
          <button 
            className="btn btn-outline-warning"
            onClick={() => navigate('/campaigns')}
          >
            View Active Campaigns
          </button>
        </div>
        <div className="col-md-6">
          <div className="p-5 bg-light rounded text-center">
            <img 
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=500&q=60" 
              alt="Fundraising" 
              className="img-fluid rounded"
              style={{maxHeight: '200px', objectFit: 'cover', width: '100%'}}
            />
          </div>
        </div>
      </div>

      <hr />

      {/* Campaigns Section */}
      <div className="row align-items-center my-5">
        <div className="col-md-6 order-md-2">
          <h3 className="text-info">4. Join Our Campaigns</h3>
          <p>
            Participate in our advocacy campaigns and help us raise awareness about important 
            social issues. Your voice matters!
          </p>
          <button 
            className="btn btn-outline-info"
            onClick={() => navigate('/campaigns')}
          >
            See Current Campaigns
          </button>
        </div>
        <div className="col-md-6 order-md-1">
          <div className="p-5 bg-light rounded text-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=60" 
              alt="Campaigns" 
              className="img-fluid rounded"
              style={{maxHeight: '200px', objectFit: 'cover', width: '100%'}}
            />
          </div>
        </div>
      </div>

      <hr />

      {/* Events Section */}
      <div className="row align-items-center my-5">
        <div className="col-md-6">
          <h3 className="text-danger">5. Attend Our Events</h3>
          <p>
            Join us at community events, workshops, and awareness programs. Connect with 
            like-minded individuals and be part of the change.
          </p>
          <button 
            className="btn btn-outline-danger"
            onClick={() => navigate('/events')}
          >
            View Upcoming Events
          </button>
        </div>
        <div className="col-md-6">
          <div className="p-5 bg-light rounded text-center">
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=500&q=60" 
              alt="Events" 
              className="img-fluid rounded"
              style={{maxHeight: '200px', objectFit: 'cover', width: '100%'}}
            />
          </div>
        </div>
      </div>

      {/* Donate CTA */}
      <div className="text-center mt-5 p-5 bg-warning rounded">
        <h2>6. Donate to Our Cause</h2>
        <p className="lead">Your contribution ensures no child goes to bed hungry.</p>
        <Link to="/donate" className="btn btn-dark btn-lg mt-2">Donate Now</Link>
      </div>

      {/* Volunteer Modal */}
      {showVolunteerModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Volunteer Application</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowVolunteerModal(false)}
                ></button>
              </div>
              <form onSubmit={handleVolunteerSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={volunteerForm.name}
                      onChange={(e) => setVolunteerForm({...volunteerForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={volunteerForm.email}
                      onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={volunteerForm.phone}
                      onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Skills/Expertise</label>
                    <textarea 
                      className="form-control" 
                      rows="2"
                      value={volunteerForm.skills}
                      onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                      placeholder="e.g., Teaching, Medical, Event Management"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Availability</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={volunteerForm.availability}
                      onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                      placeholder="e.g., Weekends, Evenings"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowVolunteerModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetInvolved;