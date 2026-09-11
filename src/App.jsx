import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    pradesh: '',
    name: '',
    number: '',
    checkInDate: '',
    checkOutDate: ''
  });

  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Form submitted successfully!');
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
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
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
              placeholder="e.g. 98765 43210"
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

          <button type="submit" className="submit-btn">Submit request</button>
          
          <p className="footer-text">You'll receive a confirmation by SMS</p>
        </form>
      </div>
    </div>
  );
}

export default App;
