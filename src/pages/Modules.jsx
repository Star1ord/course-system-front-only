import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import mockApi, { getTranslatedContent } from '../services/mockApi';
import ModuleRegistrationForm from '../components/ModuleRegistrationForm';

function Modules() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const [selectedModule, setSelectedModule] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { user } = useAuth();
  const { t, language } = useLanguage();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const coursesData = await mockApi.getCourses();
        const modulesData = await mockApi.getModules();
        
        // Group modules by course
        const groupedData = coursesData.map(course => ({
          ...course,
          modules: modulesData.filter(module => module.course_id === course.id)
        }));
        
        setCourses(groupedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch modules');
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const handleRegisterClick = (module) => {
    setSelectedModule(module);
  };

  const handleRegister = async (moduleId, formData) => {
    try {
      // Simulate registration success
      setRegistrationSuccess(true);
      setSelectedModule(null);
      
      // Refresh the module list
      const coursesData = await mockApi.getCourses();
      const modulesData = await mockApi.getModules();
      const groupedData = coursesData.map(course => ({
        ...course,
        modules: modulesData.filter(module => module.course_id === course.id)
      }));
      setCourses(groupedData);
    } catch (err) {
      setError('Failed to register for module');
    }
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
      modules: course.modules.filter(module => 
        module.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTranslatedContent(module.title, language).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getTranslatedContent(course.title, language).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(course => course.modules.length > 0);

  if (loading) return <div className="text-center py-8">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;

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
                        onClick={() => window.location.href = `/modules/${module.id}`}
                        className="inline-flex items-center px-4 py-2 border border-maroon text-maroon rounded hover:shadow-md hover:scale-105 hover:border-maroon-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-opacity-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {t('view')}
                      </button>
                      <button
                        onClick={() => handleRegisterClick(module)}
                        className="inline-flex items-center px-4 py-2 bg-maroon text-white rounded hover:bg-maroon-dark transition-colors duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        {t('enroll')}
                      </button>
                    </div>
                    {module.instructor && (
                      <div className="mt-2">
                        <h4 className="font-semibold text-gray-700 mb-2">{t('instructor')}:</h4>
                        <p className="text-gray-600">
                          {module.instructor.first_name} {module.instructor.surname} - {module.instructor.position}
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

      {/* Registration Modal */}
      {selectedModule && (
        <ModuleRegistrationForm
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onRegister={handleRegister}
        />
      )}

      {/* Success Message */}
      {registrationSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg">
          {t('successfullyRegistered')}
        </div>
      )}
    </div>
  );
}

export default Modules;