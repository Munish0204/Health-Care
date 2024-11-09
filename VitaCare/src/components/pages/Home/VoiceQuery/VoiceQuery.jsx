import React, { useState } from 'react';
import './VoiceQuery.css';


const VoiceQueryGenerator = () => {
    const [voiceInput, setVoiceInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [recognition, setRecognition] = useState(null);
    const [queryResult, setQueryResult] = useState([]);

    const handleStartVoiceInput = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            setErrorMessage('Speech Recognition API is not supported in this browser.');
            return;
        }

        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = 'en-US';
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;

        recognitionInstance.start();
        setIsListening(true);
        setRecognition(recognitionInstance);

        recognitionInstance.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setVoiceInput(transcript);

            fetch('http://localhost:8000/api/generate-voice-query/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ voice_input: transcript })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response:', data);
                alert(`Generated Query: ${data.query}`);
                setQueryResult(data.records);
            })
            .catch(error => {
                console.error('Error generating query:', error);
                setErrorMessage('Error generating query, please try again.');
            })
            .finally(() => {
                setIsListening(false);
            });
        };

        recognitionInstance.onerror = (event) => {
            setErrorMessage(`Error occurred: ${event.error}`);
            setIsListening(false);
        };

        recognitionInstance.onend = () => {
            setIsListening(false);
        };
    };

    const handleStopVoiceInput = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Voice Query Generator</h2>
            <button 
                onClick={isListening ? handleStopVoiceInput : handleStartVoiceInput}
                className={`px-4 py-2 rounded ${
                    isListening 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-blue-500 hover:bg-blue-600'
                } text-white`}
            >
                {isListening ? 'Stop Listening' : 'Start Voice Input'}
            </button>
            
            <p className="mt-4">Detected Input: {voiceInput}</p>
            
            {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            {queryResult.length === 0 ? (
                <p className="mt-4">No records found.</p>
            ) : (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">Fetched Records:</h3>
                    <div className="space-y-4">
                        {queryResult.map((record, index) => (
                            <div key={record.id || index} className="p-shadow">
                                <p><strong>Symptom:</strong> {record.symptom}</p>
                                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                                <p><strong>Date:</strong> {record.date_recorded}</p>
                                <p><strong>Patient ID:</strong> {record.patient}</p>
                                <br /><br />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoiceQueryGenerator;