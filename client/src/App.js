import React, { useState } from 'react';
import Footer from './Footer';
import axios from 'axios';

function App() {
  const [fever, setFever] = useState('');
  const [cough, setCough] = useState('');
  const[fatigue, setFatigue] = useState('');
  const [difficultyBreathing, setDifficultyBreathing] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [cholesterol, setCholesterol] = useState('');


  const [prediction, setPrediction] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setPrediction('');

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        symptoms: [
          parseFloat(fever),
          parseInt(cough),
          parseInt(fatigue),
          parseInt(difficultyBreathing),
          parseInt(age),
          parseInt(gender),
          parseInt(bloodPressure),
          parseInt(cholesterol),
          0,
          0,
          0,
          0,  
        ],
      });

      setPrediction(response.data.prediction);
    } catch(error) {
      console.error('Error making prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl bg-red-500 text-white p-4">Medical Diagnosis Assistant</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Fever (Yes=1, No=0):</label>
            <input
              type="text"
              value={fever}
              onChange={(e) => setFever(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Cough (Yes=1, No=0):</label>
            <input
              type="text"
              value={cough}
              onChange={(e) => setCough(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Fatigue (Yes=1, No=0):</label>
            <input
              type="text"
              value={fatigue}
              onChange={(e) => setFatigue(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Difficulty Breathing (Yes=1, No=0):</label>
            <input
              type="text"
              value={difficultyBreathing}
              onChange={(e) => setDifficultyBreathing(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Age:</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Gender (Male=1, Female=0):</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Blood Pressure (Low=0, Normal=1, High=2):</label>
            <input
              type="text"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-medium">Cholesterol Level (Low=0, Normal=1, High=2):</label>
            <input
              type="text"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium p-3 rounded mt-4 hover:bg-blue-600 transition"
          >
            Predict Disease
          </button>
        </form>

        {loading && <p className="text-center text-blue-500 mt-4">Loading...</p>}
        {prediction && <h2 className="text-2xl text-center text-green-600 mt-4">Prediction: {prediction}</h2>}
        {error && <p className="text-center text-red-600 mt-4">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}
export default App;
