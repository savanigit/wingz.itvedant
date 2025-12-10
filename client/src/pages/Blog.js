import React from 'react';
import { useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();

  // Dummy data to simulate a database of blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Success Story: Ravi's Journey to School",
      author: "Priya Sharma",
      date: "March 10, 2024",
      excerpt: "How a small scholarship changed the life of a young boy in rural Bihar.",
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 2,
      title: "Project Update: Clean Water for Everyone",
      author: "Amit Verma",
      date: "March 05, 2024",
      excerpt: "Our team successfully installed 50 new hand pumps in the Odisha district.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=60"
    },
    {
      id: 3,
      title: "Interview: Meet Our New Volunteer Head",
      author: "Admin",
      date: "February 28, 2024",
      excerpt: "We sat down with Sarah to discuss her vision for our volunteer program.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=60"
    }
  ];

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button className="btn btn-outline-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="text-center mb-5">
        <h1 className="fw-bold">Our Latest Blog</h1>
        <p className="text-muted">Stay updated with our stories, news, and impact reports.</p>
      </div>

      <div className="row">
        {blogPosts.map((post) => (
          <div className="col-md-4 mb-4" key={post.id}>
            <div className="card h-100 shadow-sm border-0">
              <img src={post.image} className="card-img-top" alt={post.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <small className="text-muted">{post.date} | By {post.author}</small>
                <h5 className="card-title fw-bold mt-2">{post.title}</h5>
                <p className="card-text">{post.excerpt}</p>
                <button className="btn btn-link text-primary p-0 text-decoration-none">Read More &rarr;</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;