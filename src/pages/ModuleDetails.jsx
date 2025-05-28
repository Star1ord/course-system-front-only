import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mockApi, { getTranslatedContent } from '../services/mockApi';

function ModuleDetails() {
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, language } = useLanguage();

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

  if (loading) return <div className="text-center py-8">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!module) return <div className="text-center py-8">{t('moduleNotFound')}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-maroon text-white p-6">
            <h1 className="text-3xl font-bold mb-2">
              {module.code} - {getTranslatedContent(module.title, language)}
            </h1>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('Description')}</h2>
              <p className="text-gray-600">
                {getTranslatedContent(module.description, language)}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('Contents')}</h2>
              <p className="text-gray-600">
                {getTranslatedContent(module.contents, language)}
              </p>
            </div>

            {module.instructor && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{t('Instructor')}</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-medium">
                    {module.instructor.first_name} {module.instructor.surname}
                  </p>
                  <p className="text-gray-600">{module.instructor.position}</p>
                  <p className="text-gray-600">{module.instructor.email}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => navigate('/modules')}
                className="px-4 py-2 border border-maroon text-maroon rounded hover:bg-maroon hover:text-white transition-colors duration-200"
              >
                {t('backToModules')}
              </button>
              <button
                onClick={() => navigate(`/modules/${module.id}/register`)}
                className="px-4 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200"
              >
                {t('enroll')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetails; 