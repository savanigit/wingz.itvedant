import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Campaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/campaigns/active/');
      setCampaigns(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setLoading(false);
    }
  };

  const handleDonate = (campaign) => {
    // Navigate to donate page with campaign pre-selected
    navigate('/donate', { state: { campaign: campaign.title } });
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      
      <h1 className="text-center fw-bold mb-3">Active Fundraising Campaigns</h1>
      <p className="text-center text-muted mb-5">
        Join our campaigns and make a direct impact on specific initiatives
      </p>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : campaigns.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No active campaigns at the moment.</p>
        </div>
      ) : (
        <div className="row g-4">
          {campaigns.map((campaign) => (
            <div className="col-12 col-lg-6" key={campaign.id}>
              <div className="card shadow-sm border-0 h-100">
                {campaign.image_url && (
                  <img 
                    src={campaign.image_url} 
                    className="card-img-top" 
                    alt={campaign.title}
                    style={{height: '250px', objectFit: 'cover'}}
                  />
                )}
                <div className="card-body">
                  <h4 className="card-title fw-bold">{campaign.title}</h4>
                  <p className="card-text">{campaign.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-muted">Progress</span>
                      <span className="fw-bold text-success">
                        {campaign.progress_percentage.toFixed(0)}%
                      </span>
                    </div>
                    <div className="progress" style={{height: '25px'}}>
                      <div 
                        className="progress-bar bg-success" 
                        role="progressbar" 
                        style={{width: `${Math.min(campaign.progress_percentage, 100)}%`}}
                        aria-valuenow={campaign.progress_percentage} 
                        aria-valuemin="0" 
                        aria-valuemax="100"
                      >
                        {campaign.progress_percentage.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  {/* Funding Details */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <div className="text-center p-3 bg-light rounded">
                        <h5 className="mb-0 text-success">₹{parseFloat(campaign.raised_amount).toLocaleString()}</h5>
                        <small className="text-muted">Raised</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="text-center p-3 bg-light rounded">
                        <h5 className="mb-0 text-primary">₹{parseFloat(campaign.goal_amount).toLocaleString()}</h5>
                        <small className="text-muted">Goal</small>
                      </div>
                    </div>
                  </div>

                  {/* Campaign Dates */}
                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="bi bi-calendar"></i> {new Date(campaign.start_date).toLocaleDateString()} - {new Date(campaign.end_date).toLocaleDateString()}
                    </small>
                    {campaign.days_remaining !== null && (
                      <small className="text-muted ms-3">
                        <i className="bi bi-clock"></i> {campaign.days_remaining} days remaining
                      </small>
                    )}
                  </div>

                  <button 
                    className="btn btn-warning w-100 py-2 fw-bold"
                    onClick={() => handleDonate(campaign)}
                  >
                    Support This Campaign
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-5 p-5 bg-light rounded">
        <h3>Want to Start Your Own Fundraiser?</h3>
        <p className="text-muted">
          Individuals can create their own fundraising campaigns to support our cause
        </p>
        <button className="btn btn-primary" onClick={() => navigate('/contact')}>
          Contact Us to Learn More
        </button>
      </div>
    </div>
  );
}

export default Campaigns;
