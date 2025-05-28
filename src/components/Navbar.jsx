import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const { t } = useLanguage();

  const handleLogout = () => {
    // Existing logout logic
    window.location.reload(); // Add page reload
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Mobile menu button */}
        <div className="md:hidden py-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-maroon focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex justify-center space-x-8 py-4">
          <Link to="/" className="text-gray-700 hover:text-maroon font-medium">
            {t('home')}
          </Link>
          <div className="relative group">
            <button className="text-gray-700 hover:text-maroon font-medium focus:outline-none">
              {t('explore')}
            </button>
            <div className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out bg-white text-gray-700 shadow-md mt-2 rounded z-10 min-w-[120px]">
              <Link to="/courses" className="block px-4 py-2 hover:bg-gray-100 hover:text-maroon transition-colors duration-200">{t('courses')}</Link>
              <Link to="/modules" className="block px-4 py-2 hover:bg-gray-100 hover:text-maroon transition-colors duration-200">{t('modules')}</Link>
            </div>
          </div>
          <Link to="/about" className="text-gray-700 hover:text-maroon font-medium">
            {t('about')}
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-maroon font-medium">
            {t('contact')}
          </Link>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-maroon font-medium">
              {t('home')}
            </Link>
            <div>
              <button
                onClick={() => setIsExploreOpen(!isExploreOpen)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-maroon font-medium focus:outline-none"
              >
                {t('explore')}
                <svg
                  className={`w-4 h-4 transform transition-transform ${isExploreOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isExploreOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <Link to="/courses" className="block text-gray-700 hover:text-maroon font-medium">
                    {t('courses')}
                  </Link>
                  <Link to="/modules" className="block text-gray-700 hover:text-maroon font-medium">
                    {t('modules')}
                  </Link>
                </div>
              )}
            </div>
            <Link to="/about" className="block text-gray-700 hover:text-maroon font-medium">
              {t('about')}
            </Link>
            <Link to="/contact" className="block text-gray-700 hover:text-maroon font-medium">
              {t('contact')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar; 