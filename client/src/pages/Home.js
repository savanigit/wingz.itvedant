import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Empowering Communities, Changing Lives</h1>
        <p className="hero-subtitle">
          Our mission is to create a lasting impact in the lives of underprivileged children 
          and communities.
        </p>
        <div>
          <button className="btn btn-warning btn-custom me-3">Donate Now</button>
          <button className="btn btn-outline-light btn-custom">Our Work</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h3>10,000+</h3>
            <p>Children Educated</p>
          </div>
          <div className="col-md-4">
            <h3>50+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="col-md-4">
            <h3>20+</h3>
            <p>States Covered</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;