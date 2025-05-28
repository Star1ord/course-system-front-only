import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Home() {
  const { t } = useLanguage();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-8">{t('welcomeToDMU')}</h1>
      <p className="text-xl mb-8">
        {t('heroDescription')}
      </p>
      <div className="space-x-4">
        <Link
          to="/courses"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          {t('exploreCourses')}
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          {t('getStarted')}
        </Link>
      </div>
    </div>
  );
}

export default Home;

