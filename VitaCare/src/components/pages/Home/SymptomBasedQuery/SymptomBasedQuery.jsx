// src/pages/SymptomBasedQuery.js
import React, { useState } from 'react';
import axios from 'axios';
import './SymptomBasedQuery.css';

const SymptomBasedQuery = () => {
    const [symptom, setSymptom] = useState('');
    const [conditions, setConditions] = useState([]);
    const [logicalOperator, setLogicalOperator] = useState('AND');
    const [errorMessage, setErrorMessage] = useState('');
    const [query, setQuery] = useState('');
    const [queryUrl, setQueryUrl] = useState('');

    const handleConditionsChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setConditions(selectedOptions);
    };

    const handleSubmit = () => {
        if (!symptom.trim()) {
            setErrorMessage('Please enter a symptom.');
            return;
        }

        if (conditions.length === 0) {
            setErrorMessage('Please select at least one condition.');
            return;
        }

        setErrorMessage('');
        
        // Send data to the backend (make sure the backend API is running)
        axios
            .post('http://localhost:8000/api/generate-symptom-query/', {
                symptom,
                conditions,
                logical_operator: logicalOperator,
            })
            .then((response) => {
                const generatedQuery = response.data.query;
                setQuery(generatedQuery);

                const baseUrl = 'http://localhost:3000/search';
                const url = new URL(baseUrl);
                url.searchParams.append('symptom', symptom);
                url.searchParams.append('conditions', conditions.join(','));
                url.searchParams.append('operator', logicalOperator);

                setQueryUrl(url.toString());
            })
            .catch((error) => {
                console.error('Error generating query:', error);
                setErrorMessage('Error generating query. Please try again.');
            });
    };

    return (
        <div className="symptom-based-query-container">
            <h2>Symptom-Based Query Generator</h2>

            <input
                type="text"
                placeholder="Enter Symptom"
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                className="symptom-input"
            />

            <select
                multiple
                onChange={handleConditionsChange}
                className="conditions-select"
            >
                <option value="fever">Fever</option>
                <option value="pneumonia">Pneumonia</option>
                <option value="headache">Headache</option>
                <option value="fatigue">Fatigue</option>
                <option value="nausea">Nausea</option>
                <option value="cough">Cough</option>
            </select>

            <select
                onChange={(e) => setLogicalOperator(e.target.value)}
                value={logicalOperator}
                className="operator-select"
            >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="NOT">NOT</option>
            </select>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button onClick={handleSubmit} className="submit-button">
                Generate Query
            </button>

            {query && (
                <div className="query-result">
                    <h3>Generated Query:</h3>
                    <p>{query}</p>
                    {queryUrl && (
                        <p>
                            <a href={queryUrl} target="_blank" rel="noopener noreferrer">
                                {queryUrl}
                            </a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SymptomBasedQuery;
