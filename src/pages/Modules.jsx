import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mockApi, { getTranslatedContent } from '../services/mockApi';

function Modules() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleViewDetails = (moduleId) => {
    navigate(`/modules/${moduleId}`);
  };

  const handleRegister = (moduleId) => {
    navigate(`/modules/${moduleId}/register`);
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.split(regex).map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200">{part}</span>
      ) : part
    );
  };

  const courseId = searchParams.get('course');
  const filteredCourses = courses
    .filter(course => !courseId || course.id === parseInt(courseId))
    .map(course => ({
      ...course,
      modules: modules[course.id]?.filter(module => 
        module.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTranslatedContent(module.title, language).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTranslatedContent(course.title, language).toLowerCase().includes(searchTerm.toLowerCase())
      ) || []
    }))
    .filter(course => course.modules.length > 0);

  if (loading) return <div className="text-center py-8">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600 py-8">{t('error')}: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-maroon mb-4">
          {courseId ? t('courseModules') : t('availableModules')}
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-maroon"
          />
        </div>
      </div>

      <div className="space-y-12">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-maroon text-white p-4">
              <h2 className="text-2xl font-bold">
                {highlightText(getTranslatedContent(course.title, language), searchTerm)}
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {course.modules.map((module) => (
                <div key={module.id} className="border-l-4 border-maroon pl-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {highlightText(module.code, searchTerm)} - {highlightText(getTranslatedContent(module.title, language), searchTerm)}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleViewDetails(module.id)}
                        className="inline-flex items-center px-4 py-2 border border-maroon text-maroon rounded hover:shadow-md hover:scale-105 hover:border-maroon-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-opacity-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {t('View Details')}
                      </button>
                      <button
                        onClick={() => handleRegister(module.id)}
                        className="inline-flex items-center px-4 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {t('register')}
                      </button>
                    </div>
                    {module.instructor && (
                      <div className="mt-2">
                        <h4 className="font-semibold text-gray-700 mb-2">{t('Instructor')}:</h4>
                        <p className="text-gray-600">
                          {module.instructor.first_name} {module.instructor.surname} - {getTranslatedContent(module.instructor.position, language)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modules;