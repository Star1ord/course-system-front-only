import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mockApi, { getTranslatedContent } from '../services/mockApi';
import ReactConfetti from 'react-confetti';

function ModuleRegistration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
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
        const moduleData = await mockApi.getModule(id);
        setModule(moduleData);
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
    
    try {
      // Simulate registration process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
    } catch (err) {
      setError(err.message || 'Failed to register for module. Please try again.');
    }
  };

  const handleBack = () => {
    navigate(`/modules/${id}`);
  };

  if (loading) return <div className="text-center py-8">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600 py-8">{t('error')}: {error}</div>;
  if (!module) return <div className="text-center py-8">{t('moduleNotFound')}</div>;

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
          {t('backToModuleDetails')}
        </button>

        {success ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-green-500 text-white p-6">
              <h1 className="text-3xl font-bold">{t('Registration Successful')}</h1>
              <p className="text-lg mt-2">{t('Successfully registered for')} {getTranslatedContent(module.title, language)}</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600">{t('Redirecting to module details...')}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-maroon text-white p-6">
              <h1 className="text-3xl font-bold">{t('Register for')} {getTranslatedContent(module.title, language)}</h1>
              <p className="text-lg mt-2">{module.code}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="preferred_track" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Preferred Track')}
                </label>
                <select
                  id="preferred_track"
                  name="preferred_track"
                  value={formData.preferred_track}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
                  required
                >
                  <option value="">{t('Select Track')}</option>
                  <option value="morning">{t('Morning')}</option>
                  <option value="afternoon">{t('Afternoon')}</option>
                  <option value="evening">{t('Evening')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('Additional Notes')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon focus:border-transparent"
                  placeholder={t('I want to focus on...')}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="w-full px-8 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200"
                >
                  {t('Complete Registration')}
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