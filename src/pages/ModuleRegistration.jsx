import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import ReactConfetti from 'react-confetti';

function ModuleRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [formData, setFormData] = useState({
    preferred_track: '',
    notes: ''
  });

  useEffect(() => {
    const fetchModule = async () => {
      try {
        const response = await api.get(`/modules/${id}`);
        setModule(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch module details');
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!user) {
      setError('Please log in to register for modules');
      return;
    }

    try {
      console.log('Starting registration process...');
      
      // First register for the module
      console.log('Sending registration request...');
      const registerResponse = await api.post(`/modules/${id}/register`);
      console.log('Registration response:', registerResponse.data);

      // Only proceed with updating details if registration was successful
      if (registerResponse.data.message === 'Successfully registered for module') {
        // Then update registration details
        console.log('Sending registration details...');
        const detailsResponse = await api.post(`/modules/${id}/registration-details`, formData);
        console.log('Details update response:', detailsResponse.data);
        
        // Show success message and confetti
        setSuccess(true);
        setShowConfetti(true);
        
        // Hide confetti after 5 seconds
        setTimeout(() => {
          setShowConfetti(false);
          // Navigate back to module details after confetti stops
          setTimeout(() => {
            navigate(`/modules/${id}`);
          }, 1000);
        }, 5000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.status === 400 && err.response?.data?.error === 'Already registered for this module') {
        setError('You are already registered for this module.');
      } else {
        setError(err.response?.data?.error || 'Failed to register for module. Please try again.');
      }
    }
  };

  const handleBack = () => {
    navigate(`/modules/${id}`);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!module) return <div className="text-center py-8">Module not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {showConfetti && <ReactConfetti />}
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="inline-flex items-center text-maroon hover:text-maroon-dark mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Module Details
        </button>

        {success ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 text-white p-6">
              <h1 className="text-3xl font-bold">Registration Successful!</h1>
              <p className="text-lg mt-2">You have successfully registered for {module.title}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600">You will be redirected to the module details page shortly...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-maroon text-white p-6">
              <h1 className="text-3xl font-bold">Register for {module.title}</h1>
              <p className="text-lg mt-2">{module.code}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="preferred_track" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Track
                </label>
                <select
                  id="preferred_track"
                  name="preferred_track"
                  value={formData.preferred_track}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
                  required
                >
                  <option value="">Select a track</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
                  placeholder="Any additional information you'd like to provide..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full px-8 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModuleRegistration;