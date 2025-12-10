import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple mock authentication
    if (email === 'admin@ngo.org' && password === 'admin123') {
      alert('Login Successful!');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid Credentials! (Try: admin@ngo.org / admin123)');
    }
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '70vh'}}>
        <div className="card shadow p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="admin@ngo.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <small className="text-muted">Use: admin@ngo.org / admin123</small>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Login;