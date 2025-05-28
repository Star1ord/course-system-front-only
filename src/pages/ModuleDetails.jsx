import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

function ModuleDetails() {
  const { id } = useParams();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleRegister = async () => {
    try {
      await api.post(`/modules/${id}/register`);
      // Refresh module details after registration
      const response = await api.get(`/modules/${id}`);
      setModule(response.data);
    } catch (err) {
      setError('Failed to register for module');
    }
  };

  const handleBack = () => {
    navigate('/modules');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!module) return <div className="text-center py-8">Module not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="inline-flex items-center text-maroon hover:text-maroon-dark mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Modules
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-maroon text-white p-6">
            <h1 className="text-3xl font-bold">{module.title}</h1>
            <p className="text-lg mt-2">{module.code}</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600">{module.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Contents</h2>
              <p className="text-gray-600">{module.contents}</p>
            </div>

            {module.instructor && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Instructor</h2>
                <p className="text-gray-600">
                  {module.instructor.first_name} {module.instructor.surname} - {module.instructor.position}
                </p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => window.location.href = `/modules/${id}/register`}
                className="inline-flex items-center justify-center px-8 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200 w-full"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetails; 