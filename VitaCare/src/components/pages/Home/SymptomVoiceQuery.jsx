import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from React Router
import "./SymptomVoiceQuery.css";

const SymptomVoiceQuery = () => {
  const navigate = useNavigate();  // Initialize navigate function

  // Function to handle symptom-based query button click
  const handleSymptomQueryClick = () => {
    navigate('/symptom-based-query');  // Navigate to the SymptomBasedQuery page
  };

  // Function to handle voice query button click
  const handleVoiceQueryClick = () => {
    navigate('/voice-query');  // Navigate to the VoiceQuery page (you can define this page)
  };

  return (
    <div className="symptom-voice-query-container">
      <h2>Symptom Checker & Voice Query</h2>
      <button className="symptom-query-button" onClick={handleSymptomQueryClick}>
        Symptom-based Query
      </button>
      <button className="voice-query-button" onClick={handleVoiceQueryClick}>
        Voice Query
      </button>
    </div>
  );
};

export default SymptomVoiceQuery;
