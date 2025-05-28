import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-grey text-black py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="mb-2">© {new Date().getFullYear()} DMUK IT Faculty. {t('allRightsReserved')}</p>
          <p className="text-sm">{t('facultyName')}</p>
        </div>
      </div>
    </footer>
  );
}
