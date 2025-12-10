import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Donate() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1000);
  const [paymentType, setPaymentType] = useState('one-time');
  const [project, setProject] = useState('General Fund');

  const handleDonate = (e) => {
    e.preventDefault();
    // In a real app, you would integrate Stripe/Razorpay SDK here.
    // For this frontend project, we simulate a successful payment.
    
    alert(`Processing ₹${amount} donation for ${project}...`);
    
    // Redirect to the success page after a short delay
    setTimeout(() => {
      navigate('/donate-success');
    }, 1500);
  };

  return (
    <div className="container py-5">
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-3">
        ← Back
      </button>
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white text-center py-4">
              <h2 className="fw-bold mb-0">Make a Donation</h2>
              <p className="mb-0">Your support changes lives.</p>
            </div>
            <div className="card-body p-3 p-md-5">
              
              <form onSubmit={handleDonate}>
                {/* 1. Donation Type */}
                <div className="mb-4">
                  <div className="btn-group w-100 flex-column flex-sm-row" role="group">
                    <input 
                      type="radio" className="btn-check" name="type" id="onetime" 
                      checked={paymentType === 'one-time'} onChange={() => setPaymentType('one-time')} 
                    />
                    <label className="btn btn-outline-primary py-2" htmlFor="onetime">One-Time</label>

                    <input 
                      type="radio" className="btn-check" name="type" id="recurring" 
                      checked={paymentType === 'recurring'} onChange={() => setPaymentType('recurring')} 
                    />
                    <label className="btn btn-outline-primary py-2" htmlFor="recurring">Monthly (Recurring)</label>
                  </div>
                </div>

                {/* 2. Select Amount */}
                <h5 className="mb-3">Select Amount (INR)</h5>
                <div className="row mb-3">
                  {[500, 1000, 2000, 5000].map((val) => (
                    <div className="col-3" key={val}>
                      <button 
                        type="button" 
                        className={`btn w-100 ${amount === val ? 'btn-success' : 'btn-outline-secondary'}`}
                        onClick={() => setAmount(val)}
                      >
                        ₹{val}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="form-label text-muted">Or enter custom amount</label>
                  <input 
                    type="number" className="form-control" 
                    value={amount} onChange={(e) => setAmount(Number(e.target.value))} 
                  />
                </div>

                {/* 3. Select Project */}
                <div className="mb-4">
                  <label className="form-label fw-bold">I want to support:</label>
                  <select className="form-select" value={project} onChange={(e) => setProject(e.target.value)}>
                    <option value="General Fund">Where it's needed most</option>
                    <option value="Education">Education for Children</option>
                    <option value="Healthcare">Healthcare Services</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                  </select>
                </div>

                {/* 4. Payment Gateway Selection */}
                <div className="mb-4">
                  <label className="form-label fw-bold">Select Payment Method:</label>
                  <div className="d-flex gap-3">
                    <div className="form-check border p-3 rounded w-100">
                      <input className="form-check-input" type="radio" name="gateway" id="razorpay" defaultChecked />
                      <label className="form-check-label" htmlFor="razorpay">Razorpay / UPI</label>
                    </div>
                    <div className="form-check border p-3 rounded w-100">
                      <input className="form-check-input" type="radio" name="gateway" id="stripe" />
                      <label className="form-check-label" htmlFor="stripe">Credit Card (Stripe)</label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-warning w-100 py-3 fw-bold fs-5">
                  Donate ₹{amount}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;