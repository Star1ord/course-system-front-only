import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mockApi, { getTranslatedContent } from '../services/mockApi';

function Courses() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await mockApi.getCourses();
        setCourses(coursesData);
        
        // Fetch modules for each course
        const modulesData = {};
        for (const course of coursesData) {
          const courseModules = await mockApi.getModules(course.id);
          modulesData[course.id] = courseModules;
        }
        setModules(modulesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEnroll = (courseId) => {
    navigate(`/modules?course=${courseId}`);
  };

  if (loading) return <div className="text-center">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{t('error')}: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-maroon mb-8">{t('availableCourses')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-maroon mb-2">{getTranslatedContent(course.title, language)}</h3>
              <p className="text-gray-600 mb-4">{getTranslatedContent(course.description, language)}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">{t('availableModules')}:</h4>
                {modules[course.id] && modules[course.id].length > 0 ? (
                  <ul className="space-y-2">
                    {modules[course.id].map((module) => (
                      <li key={module.id} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {module.code} - {getTranslatedContent(module.title, language)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">{t('noModules')}</p>
                )}
              </div>

              <button 
                onClick={() => handleEnroll(course.id)}
                className="w-full bg-maroon text-white px-4 py-2 rounded hover:bg-maroon-dark transition-colors"
              >
                {t('enroll')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses; 