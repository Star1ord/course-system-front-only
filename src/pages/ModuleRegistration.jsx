import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mockApi, { getTranslatedContent } from '../services/mockApi';

function ModuleRegistration() {
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    previous_experience: '',
    learning_goals: '',
    special_requirements: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => {
        navigate('/modules');
      }, 2000);
    } catch (err) {
      setError('Failed to register for module');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div className="text-center py-8">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!module) return <div className="text-center py-8">{t('moduleNotFound')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-maroon text-white p-6">
            <h1 className="text-3xl font-bold mb-2">
              {t('registerForModule')}: {module.code} - {getTranslatedContent(module.title, language)}
            </h1>
          </div>

          <div className="p-6 space-y-6">
            {success ? (
              <div className="text-center py-8">
                <div className="text-green-600 text-xl mb-4">{t('registrationSuccess')}</div>
                <p className="text-gray-600">{t('redirectingToModules')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('Previous Experience')}
                  </label>
                  <textarea
                    name="previous_experience"
                    value={formData.previous_experience}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
                    rows="3"
                    placeholder={t('describeExperience')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('Learning Goals')}
                  </label>
                  <textarea
                    name="learning_goals"
                    value={formData.learning_goals}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
                    rows="3"
                    placeholder={t('describeGoals')}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {t('Special Requirements')}
                  </label>
                  <textarea
                    name="special_requirements"
                    value={formData.special_requirements}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-maroon"
                    rows="3"
                    placeholder={t('describeRequirements')}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/modules/${id}`)}
                    className="px-4 py-2 border border-maroon text-maroon rounded hover:bg-maroon hover:text-white transition-colors duration-200"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200"
                  >
                    {t('submitRegistration')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleRegistration;