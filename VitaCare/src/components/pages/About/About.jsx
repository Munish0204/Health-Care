import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <section className="about-overview">
        <h1>About Us</h1>
        <p>
          In healthcare, finding the right information fast is essential. Our AI-powered tool makes it easier for doctors, researchers, and healthcare professionals to search through large medical databases accurately and quickly. Instead of spending time on complex searches, our tool automatically creates precise Boolean queries that bring up only the most relevant results, helping professionals focus on what matters—making informed decisions to improve patient care and advance medical research.
        </p>
        <p>
          Our tool is designed specifically for healthcare, using advanced AI to give users the exact information they need without extra complexity. We believe in putting powerful, easy-to-use technology in the hands of those who work to improve health every day.
        </p>
      </section>

      <section className="about-vision">
        <h2>Vision</h2>
        <blockquote>
          "To make healthcare data easy to access and use, empowering every healthcare professional to find the information they need to improve lives and advance medical knowledge."
        </blockquote>
        <p>
          Our vision is a world where searching for medical information is fast, accurate, and simple, so healthcare professionals can focus on helping people. We aim to make information access a powerful tool for change, better health, and progress in medicine.
        </p>
      </section>

      <section className="about-mission">
        <h2>Mission</h2>
        <ul>
          <li><strong>Creating Accurate Searches:</strong> Using AI to automatically turn search terms into precise Boolean queries that bring up the most relevant data.</li>
          <li><strong>Building for Healthcare Needs:</strong> Offering filters and options that let users fine-tune their searches for different purposes, like research or diagnosis.</li>
          <li><strong>Keeping It Simple:</strong> Designing an intuitive, easy-to-use tool for professionals who need information quickly and accurately.</li>
          <li><strong>Supporting Better Healthcare Decisions:</strong> By providing the right information faster, we help healthcare workers make well-informed decisions that improve patient outcomes.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
