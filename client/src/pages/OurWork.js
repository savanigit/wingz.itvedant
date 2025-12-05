import React from 'react';

function OurWork() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold">Our Work & Initiatives</h1>
      
      <div className="row">
        {/* Education Program */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h4>Education</h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                Initiatives aimed at providing education to underprivileged children. 
                We believe education is the key to breaking the cycle of poverty.
              </p>
            </div>
          </div>
        </div>

        {/* Healthcare Initiative */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-header bg-danger text-white text-center">
              <h4>Healthcare</h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                Health camps, mobile health units, and other community-based health interventions 
                to ensure basic medical access for all.
              </p>
            </div>
          </div>
        </div>

        {/* Livelihood Program */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-0 shadow-lg">
            <div className="card-header bg-success text-white text-center">
              <h4>Livelihood</h4>
            </div>
            <div className="card-body">
              <p className="card-text">
                Vocational training and livelihood generation programs for marginalized communities 
                to encourage self-reliance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurWork;