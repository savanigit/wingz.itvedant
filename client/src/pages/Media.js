import React from 'react';
import { useNavigate } from 'react-router-dom';

function Media() {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <h2 className="text-center fw-bold mb-5">Media & Gallery</h2>

      {/* Photo Gallery Section */}
      <h4 className="mb-3 text-primary">Photo Gallery</h4>
      <div className="row mb-5 g-3">
        <div className="col-12 col-sm-6 col-lg-4 mb-3">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=500&q=60" className="img-fluid rounded shadow w-100" alt="Event 1" style={{height: '250px', objectFit: 'cover'}} />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 mb-3">
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=500&q=60" className="img-fluid rounded shadow w-100" alt="Event 2" style={{height: '250px', objectFit: 'cover'}} />
        </div>
        <div className="col-12 col-sm-6 col-lg-4 mb-3">
          <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=500&q=60" className="img-fluid rounded shadow w-100" alt="Event 3" style={{height: '250px', objectFit: 'cover'}} />
        </div>
      </div>

      {/* Videos Section */}
      <h4 className="mb-3 text-danger">Videos</h4>
      <div className="row mb-5 g-3">
        <div className="col-12 col-lg-6 mb-3">
          <div className="ratio ratio-16x9 shadow">
            {/* Placeholder for YouTube Video */}
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" allowFullScreen></iframe>
          </div>
        </div>
        <div className="col-md-6 mb-3">
           <div className="p-5 bg-light border text-center d-flex align-items-center justify-content-center h-100">
             <p className="text-muted">More Videos Coming Soon</p>
           </div>
        </div>
      </div>

      {/* Press Releases Section */}
      <h4 className="mb-3 text-success">Press Releases & News</h4>
      <div className="list-group">
        <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">NGO wins "Best Social Impact" Award</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">Our efforts in rural education have been recognized by the State Government.</p>
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">New Healthcare Center Opened in Pune</h5>
            <small>1 week ago</small>
          </div>
          <p className="mb-1">We are expanding our reach to provide free medical checkups.</p>
        </a>
      </div>
    </div>
  );
}

export default Media;