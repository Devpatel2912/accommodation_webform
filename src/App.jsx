import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    pradesh: '',
    name: '',
    number: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pradeshList, setPradeshList] = useState([]);

  const BASE_URL = 'http://27.116.52.24:8072/requests';
  const today = new Date().toISOString().split('T')[0];

  // Fetch Pradesh list from database on mount
  useEffect(() => {
    fetch(`${BASE_URL}/pradesh`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.pradesh) {
          setPradeshList(data.pradesh);
        }
      })
      .catch(err => console.error('Failed to load Pradesh list:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch(`${BASE_URL}/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowModal(true);
      } else {
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Unable to connect to server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-wrapper">
        
        <div className="form-header">
          <p className="subtitle">Stay request</p>
          <h1 className="title">Book your stay</h1>
          <p className="description">
            Fill in your details and we'll confirm your accommodation shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="accommodation-form">
          
          <div className="form-group">
            <label htmlFor="pradesh">State</label>
            <select 
              id="pradesh" 
              name="pradesh" 
              value={formData.pradesh} 
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select your Pradesh</option>
              {pradeshList.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="name">Full name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="e.g. Aarav Patel"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Contact number</label>
            <input 
              type="tel" 
              id="number" 
              name="number" 
              value={formData.number} 
              onChange={handleChange} 
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
              }}
              pattern="[0-9]{10}"
              maxLength="10"
              placeholder="e.g. 9876543210"
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <label htmlFor="checkInDate">Check-in</label>
              <input 
                type="date" 
                id="checkInDate" 
                name="checkInDate" 
                value={formData.checkInDate} 
                onChange={handleChange} 
                min={today}
                required 
              />
            </div>
            <div className="form-group half-width">
              <label htmlFor="checkOutDate">Check-out</label>
              <input 
                type="date" 
                id="checkOutDate" 
                name="checkOutDate" 
                value={formData.checkOutDate} 
                onChange={handleChange} 
                min={formData.checkInDate || today}
                required 
              />
            </div>
          </div>

          {errorMsg && (
            <p className="error-text">{errorMsg}</p>
          )}

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit request'}
          </button>
          
          <p className="footer-text">You'll receive a confirmation by SMS</p>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="celebration-icon">🎉</div>
            <h2 className="modal-title">Thank You!</h2>
            <p className="modal-text">Your accommodation request has been submitted successfully.</p>
            <button 
              className="close-btn" 
              onClick={() => {
                setShowModal(false);
                setFormData({
                  pradesh: '',
                  name: '',
                  number: '',
                  checkInDate: '',
                  checkOutDate: ''
                });
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
