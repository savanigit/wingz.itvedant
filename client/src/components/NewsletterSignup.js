import React, { useState } from 'react';
import axios from 'axios';

function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      await axios.post('http://localhost:8000/api/newsletter/', {
        email,
        name,
      });
      setMessage({ 
        text: 'Thank you for subscribing! You will receive our latest updates.', 
        type: 'success' 
      });
      setEmail('');
      setName('');
    } catch (error) {
      if (error.response?.status === 400) {
        setMessage({ 
          text: 'This email is already subscribed.', 
          type: 'warning' 
        });
      } else {
        setMessage({ 
          text: 'Subscription failed. Please try again.', 
          type: 'danger' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-white py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <h3 className="mb-3">Stay Connected with Our Mission</h3>
            <p className="mb-4">
              Subscribe to our newsletter for updates on projects, success stories, and ways to get involved.
            </p>
            
            <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md-5">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3">
                <button 
                  type="submit" 
                  className="btn btn-warning w-100"
                  disabled={loading}
                >
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>

            {message.text && (
              <div className={`alert alert-${message.type} mt-3 d-inline-block`} role="alert">
                {message.text}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSignup;
