import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = (courseId) => {
    navigate(`/modules?course=${courseId}`);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">Available Modules:</h4>
              {course.modules && course.modules.length > 0 ? (
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {course.modules.map((module) => (
                    <li key={module.id}>
                      {module.code} - {module.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No modules available yet</p>
              )}
            </div>

            <button 
              onClick={() => handleEnroll(course.id)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses; 