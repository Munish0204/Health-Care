import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home/Home';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import DoctorConsultation from './components/pages/DoctorConsultation/DoctorConsultation';
import Profile from './components/pages/Profile/Profile';
import Login from './components/pages/Login/Login';
import SymptomVoiceQuery from './components/pages/Home/SymptomVoiceQuery';
import VoiceQuery from './components/pages/Home/VoiceQuery/VoiceQuery';
import SymptomBasedQuery from './components/pages/Home/SymptomBasedQuery/SymptomBasedQuery';  

const App = () => {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/symptom-voice-query" element={<SymptomVoiceQuery />} />
          <Route path="/voice-query" element={<VoiceQuery />} />
          <Route path="/symptom-based-query" element={<SymptomBasedQuery />} /> {/* Fixed typo */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-consultation" element={<DoctorConsultation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
