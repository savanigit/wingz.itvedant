import React from 'react';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const navigate = useNavigate();
  const projectList = [
    {
      id: 1,
      title: "Project Shiksha",
      category: "Education",
      status: "Ongoing",
      location: "Bihar, India",
      beneficiaries: "500+ Children",
      description: "Providing free evening classes and study materials to street children.",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 2,
      title: "Clean Water Initiative",
      category: "Health",
      status: "Completed",
      location: "Odisha, India",
      beneficiaries: "20 Villages",
      description: "Installed 50 hand pumps to ensure access to clean drinking water.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 3,
      title: "Women Artisans",
      category: "Livelihood",
      status: "Ongoing",
      location: "Rajasthan, India",
      beneficiaries: "150 Women",
      description: "Training women in handicraft making to generate sustainable income.",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?auto=format&fit=crop&w=800&q=60"
    }
  ];

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <h2 className="text-center fw-bold mb-5">Our Projects</h2>
      
      <div className="row g-4">
        {projectList.map((project) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={project.id}>
            <div className="card h-100 shadow-sm hover-shadow">
              <img src={project.image} className="card-img-top" alt={project.title} style={{height: '200px', objectFit: 'cover'}} />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
                  <span className={`badge ${project.status === 'Ongoing' ? 'bg-success' : 'bg-secondary'}`}>
                    {project.status}
                  </span>
                  <small className="text-muted">{project.category}</small>
                </div>
                <h5 className="card-title fw-bold">{project.title}</h5>
                <p className="card-text flex-grow-1">{project.description}</p>
                <ul className="list-unstyled small text-muted mt-3">
                  <li><strong>Location:</strong> {project.location}</li>
                  <li><strong>Beneficiaries:</strong> {project.beneficiaries}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;