// PatientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch patient data from the API
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://198.168.63.39:8000/api/patients/');
        setPatients(response.data.data); // `data` structure might vary based on your API response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Render loading state, error message, or patient list
  if (loading) return <p>Loading patients...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Patient List</h1>
      <ul>
        {patients.map((patient) => (
          <li key={patient.patient_id}>
            <h2>{patient.name}</h2>
            <p>Gender: {patient.gender}</p>
            <p>Age: {patient.age}</p>
            <p>Ethnicity: {patient.ethnicity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientList;
