import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Doctor from '../../../assets/doctor.jpeg';
import Expect from '../../../assets/Expect.jpg';
import hour from '../../../assets/24.jpg'
const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/symptom-voice-query');
  };

  return (
    <div className="home-container">
      <h1>Welcome to VitaCare</h1>
      <p>Your health, our priority.</p>
      <input 
        type="text" 
        placeholder="Search for health topics..." 
        className="home-search-bar" 
      />
      <button className="home-button" onClick={handleGetStarted}>Get Started</button>
      <div className="home-cards">
        <div className="home-card">
          <img src={Expect} alt="Doctor" className="card-image" />
          <h3 className="card-title">Expert Consultation</h3>
          <p className="card-description">Get advice from top medical professionals.</p>
        </div>
        <div className="home-card">
          <img src={Doctor} alt="Doctor" className="card-image" />
          <h3 className="card-title">Health Tips</h3>
          <p className="card-description">Daily tips for a healthier lifestyle.</p>
        </div>
        <div className="home-card">
          <img src={hour} alt="Doctor" className="card-image" />
          <h3 className="card-title">24/7 Support</h3>
          <p className="card-description">We're here to help you anytime, anywhere.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
