import React from 'react';

function About() {
  return (
    <div className="container py-5">
      {/* Mission and Vision Section */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <h2 className="fw-bold text-uppercase text-warning">Our Mission</h2>
          <p className="lead">
            To create a lasting impact in the lives of underprivileged children and communities 
            by providing education, woman empowerment, and livelihood opportunities.
          </p>
        </div>
        <div className="col-md-6">
          <div className="p-4 bg-light border rounded shadow-sm">
            <h2 className="fw-bold text-uppercase text-success">Our Vision</h2>
            <p>
              A world where every child has access to quality education, healthcare, 
              and the opportunity to achieve their full potential.
            </p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="text-center mb-4">Our Journey (History)</h2>
          <div className="list-group shadow-sm">
            <div className="list-group-item">
              <h5 className="mb-1 fw-bold">2015 - Inception</h5>
              <p className="mb-1">Founded with a small team of 5 volunteers dedicated to social change.</p>
            </div>
            <div className="list-group-item">
              <h5 className="mb-1 fw-bold">2018 - First Major Milestone</h5>
              <p className="mb-1">Educated over 1,000 children and launched the first mobile health unit.</p>
            </div>
            <div className="list-group-item">
              <h5 className="mb-1 fw-bold">2023 - Nationwide Impact</h5>
              <p className="mb-1">Expanded operations to 20+ states, impacting 50,000+ lives.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;