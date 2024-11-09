import React from 'react';
import './Contact.css';
import Doctor1 from '../../../assets/Doctor1.jpeg';
import Doctor2 from '../../../assets/Doctor2.jpeg';
import Doctor3 from '../../../assets/Doctor3.jpeg';
import Doctor4 from '../../../assets/Doctor4.jpeg';

const doctors = [
  {
    id: 1,
    name: 'Dr. John Doe',
    email: 'johndoe@example.com',
    phone: '+1 (123) 456-7890',
    image: Doctor1,
  },
  {
    id: 2,
    name: 'Dr. Jane Smith',
    email: 'janesmith@example.com',
    phone: '+1 (234) 567-8901',
    image: Doctor3,
  },
  {
    id: 3,
    name: 'Dr. Alice Brown',
    email: 'alicebrown@example.com',
    phone: '+1 (345) 678-9012',
    image: Doctor2,
  },
  {
    id: 4,
    name: 'Dr. Robert White',
    email: 'robertwhite@example.com',
    phone: '+1 (456) 789-0123',
    image: Doctor4,
  },
];

const Contact = () => {
  return (
    <div className="contact-container">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="doctor-card">
          <div className="profile-photo">
            <img src={doctor.image} alt={doctor.name} />
          </div>
          <h2>{doctor.name}</h2>
          <p>Email: {doctor.email}</p>
          <p>Phone: {doctor.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default Contact;
