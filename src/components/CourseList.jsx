import React, { useState, useEffect } from 'react';
import axios from '../services/api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [modules, setModules] = useState({});

  useEffect(() => {
    axios.get('/courses').then(res => setCourses(res.data));
  }, []);

  const toggleCourse = async (id) => {
    if (expanded === id) return setExpanded(null);

    const res = await axios.get(`/courses/${id}/modules`);
    setModules(prev => ({ ...prev, [id]: res.data }));
    setExpanded(id);
  };

  return (
    <div>
      {courses.map((c, i) => (
        <div key={c.id}>
          <div className="font-bold text-blue-800 cursor-pointer mt-3" onClick={() => toggleCourse(c.id)}>
            {i + 1}. {c.title}
          </div>
          {expanded === c.id && (
            <ul className="ml-4 mt-2 list-disc">
              {modules[c.id]?.map(m => <li key={m.id}>{m.title}</li>)}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
