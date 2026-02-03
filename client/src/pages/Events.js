import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Events() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/events/upcoming/');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/event-registrations/', {
        event: selectedEvent.id,
        ...formData,
      });
      alert('Registration successful! We will contact you soon.');
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      
      <h1 className="text-center fw-bold mb-5">Upcoming Events</h1>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No upcoming events at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="row g-4">
          {events.map((event) => (
            <div className="col-12 col-md-6 col-lg-4" key={event.id}>
              <div className="card h-100 shadow-sm border-0">
                {event.image_url && (
                  <img 
                    src={event.image_url} 
                    className="card-img-top" 
                    alt={event.title}
                    style={{height: '200px', objectFit: 'cover'}}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <span className={`badge bg-${event.status === 'upcoming' ? 'primary' : 'success'} mb-2 align-self-start`}>
                    {event.status.toUpperCase()}
                  </span>
                  <h5 className="card-title fw-bold">{event.title}</h5>
                  <p className="card-text flex-grow-1">{event.description}</p>
                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar-event"></i> {new Date(event.event_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="bi bi-geo-alt"></i> {event.location}
                    </small>
                    <br />
                    <small className="text-muted">
                      <i className="bi bi-tag"></i> {event.category}
                    </small>
                  </div>
                  <button 
                    className="btn btn-primary w-100"
                    onClick={() => handleRegister(event)}
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Registration Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register for {selectedEvent?.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Registration
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

export default Events;
