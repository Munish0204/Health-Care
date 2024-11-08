import React from 'react';
import './Home.css';
import Doctor from '../../../assets/doctor.jpeg'; // Make sure this path is correct

const Home = () => {
  return (
    <div className="home-container">
      
      <h1>Welcome to VitaCare</h1>
      <p>Your health, our priority.</p>
      
      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search for health topics..." 
        className="home-search-bar" 
      />

      {/* Get Started button */}
      <button className="home-button">Get Started</button>

      {/* Card Section */}
      <div className="home-cards">
        {/* Example Card 1 */}
        <div className="home-card">
          <img src={Doctor} alt="Doctor" className="card-image" />
          <h3 className="card-title">Expert Consultation</h3>
          <p className="card-description">Get advice from top medical professionals.</p>
        </div>

        {/* Example Card 2 */}
        <div className="home-card">
          <img src={Doctor} alt="Doctor" className="card-image" />
          <h3 className="card-title">Health Tips</h3>
          <p className="card-description">Daily tips for a healthier lifestyle.</p>
        </div>

        {/* Example Card 3 */}
        <div className="home-card">
          <img src={Doctor} alt="Doctor" className="card-image" />
          <h3 className="card-title">24/7 Support</h3>
          <p className="card-description">We're here to help you anytime, anywhere.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
