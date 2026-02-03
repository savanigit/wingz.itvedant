import React from 'react';
import SEO from '../components/SEO';

function Home() {
  return (
    <>
      <SEO 
        title="Home - My NGO"
        description="Empowering communities and changing lives. Join our mission to create lasting impact for underprivileged children through education, healthcare, and livelihood programs."
        keywords="NGO, charity, donation, social impact, education, healthcare, community development, volunteer"
      />
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Empowering Communities, Changing Lives</h1>
        <p className="hero-subtitle">
          Our mission is to create a lasting impact in the lives of underprivileged children 
          and communities.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
          <button className="btn btn-warning btn-custom">Donate Now</button>
          <button className="btn btn-outline-light btn-custom">Our Work</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-5">
        <div className="row text-center g-4">
          <div className="col-sm-6 col-md-4">
            <h3 className="display-4 text-primary">10,000+</h3>
            <p className="lead">Children Educated</p>
          </div>
          <div className="col-sm-6 col-md-4">
            <h3 className="display-4 text-success">50+</h3>
            <p className="lead">Projects Completed</p>
          </div>
          <div className="col-12 col-md-4">
            <h3 className="display-4 text-warning">20+</h3>
            <p className="lead">States Covered</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;