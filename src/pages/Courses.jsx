import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../services/api';

function Courses() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Computer Science',
      description: {
        en: 'The Computer Science program provides a solid foundation in programming, algorithms, and software systems. Students will develop problem-solving skills using a range of modern technologies and programming paradigms. The course prepares graduates for roles in software development, data analysis, and systems architecture.',
        ru: 'Программа по информатике обеспечивает прочную основу в программировании, алгоритмах и программных системах. Студенты разовьют навыки решения проблем, используя различные современные технологии и парадигмы программирования. Курс готовит выпускников к работе в области разработки программного обеспечения, анализа данных и системной архитектуры.'
      },
      contents: {
        en: 'Students will study key topics including object-oriented programming, database design, functional languages like Scala, and operating systems. The curriculum is structured to support both theoretical knowledge and hands-on experience.',
        ru: 'Студенты будут изучать ключевые темы, включая объектно-ориентированное программирование, проектирование баз данных, функциональные языки, такие как Scala, и операционные системы. Учебный план структурирован для поддержки как теоретических знаний, так и практического опыта.'
      },
      modules: [
        { id: 1, code: 'COS1903', title: 'Scala Programming' },
        { id: 2, code: 'COS1920', title: 'Database Management' },
        { id: 3, code: 'COS2905', title: 'Object Oriented Programming (Java)' },
        { id: 4, code: 'COS2910', title: 'Database Management' }
      ]
    },
    {
      id: 2,
      title: 'Software Engineering',
      description: {
        en: 'This program focuses on the methodologies, tools, and techniques required to build large-scale software systems. Students will learn how to apply software development life cycles, manage projects, and implement quality assurance practices. Emphasis is placed on design thinking and usability.',
        ru: 'Эта программа фокусируется на методологиях, инструментах и техниках, необходимых для создания крупномасштабных программных систем. Студенты научатся применять жизненные циклы разработки программного обеспечения, управлять проектами и внедрять практики обеспечения качества. Особое внимание уделяется дизайн-мышлению и удобству использования.'
      },
      contents: {
        en: 'Topics include agile development, user-centered design, testing frameworks, and knowledge-based systems. Students gain practical experience through labs and collaborative development projects.',
        ru: 'Темы включают гибкую разработку, пользовательский дизайн, фреймворки тестирования и системы на основе знаний. Студенты получают практический опыт через лабораторные работы и совместные проекты разработки.'
      },
      modules: [
        { id: 5, code: 'SE3906', title: 'Interaction Design' },
        { id: 6, code: 'SE3410', title: 'Web Application Penetration Testing' },
        { id: 7, code: 'SE3406', title: 'Fuzzy Logic & Knowledge Based Systems' },
        { id: 8, code: 'SE3613', title: 'Data Mining' }
      ]
    },
    {
      id: 3,
      title: 'Cyber Security',
      description: {
        en: 'The Cyber Security program prepares students to secure systems, detect threats, and respond to cyber incidents. It combines theoretical foundations with practical training in defensive and offensive security strategies. Students will explore topics such as ethical hacking, secure software, and cyber law.',
        ru: 'Программа по кибербезопасности готовит студентов к защите систем, обнаружению угроз и реагированию на киберинциденты. Она сочетает теоретические основы с практической подготовкой в области оборонительных и наступательных стратегий безопасности. Студенты изучат такие темы, как этичный хакинг, безопасное программное обеспечение и киберправо.'
      },
      contents: {
        en: 'Key components include network security, Linux system hardening, legal frameworks, and incident response planning. Graduates will be ready to pursue roles in penetration testing, security analysis, and cyber operations.',
        ru: 'Ключевые компоненты включают сетевую безопасность, укрепление систем Linux, правовые рамки и планирование реагирования на инциденты. Выпускники будут готовы к работе в области тестирования на проникновение, анализа безопасности и киберопераций.'
      },
      modules: [
        { id: 9, code: 'SE3901', title: 'C Programming' },
        { id: 10, code: 'SE3902', title: 'Computer Law and Cyber Security Management' },
        { id: 11, code: 'SE3903', title: 'Linux Security' },
        { id: 12, code: 'SE3904', title: 'Cyber Threat Intelligence and Incident Response' }
      ]
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnroll = (courseId) => {
    navigate(`/modules?course=${courseId}`);
  };

  if (loading) return <div className="text-center">{t('loading')}</div>;
  if (error) return <div className="text-center text-red-600">{t('error')}: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-maroon mb-8">{t('availableCourses')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-maroon mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description[language]}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">{t('availableModules')}:</h4>
                {course.modules && course.modules.length > 0 ? (
                  <ul className="space-y-2">
                    {course.modules.map((module) => (
                      <li key={module.id} className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {module.code} - {module.title}
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