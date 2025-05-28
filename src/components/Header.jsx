import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header({ onLogin, onRegister }) {
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('user');
    window.location.href = '/login';
    window.location.reload(2);
  };

  return (
    <header className="bg-maroon text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 md:h-10 mr-2 md:mr-4" />
            <h1 className="text-base md:text-xl font-bold hidden sm:block">
              {t('facultyName')}
            </h1>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex gap-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded hover:bg-maroon-dark ${language === 'en' ? 'bg-maroon-dark' : ''}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 rounded hover:bg-maroon-dark ${language === 'ru' ? 'bg-maroon-dark' : ''}`}
              >
                RU
              </button>
            </div>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 hover:text-gray-200 focus:outline-none"
                >
                  <span>{t('welcome')}, {user.first_name} {user.surname}</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-maroon"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {t('profile')}
                    </Link>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-maroon"
                    >
                      {t('logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={onLogin}
                  className="px-4 py-2 rounded border border-white hover:bg-white hover:text-maroon"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={onRegister}
                  className="px-4 py-2 rounded bg-white text-maroon hover:bg-gray-100"
                >
                  {t('register')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <div className="flex justify-center gap-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded hover:bg-maroon-dark ${language === 'en' ? 'bg-maroon-dark' : ''}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 rounded hover:bg-maroon-dark ${language === 'ru' ? 'bg-maroon-dark' : ''}`}
              >
                RU
              </button>
            </div>
            {user ? (
              <div className="flex flex-col items-center gap-3">
                <span className="text-white">{t('welcome')}, {user.first_name} {user.surname}</span>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 rounded border border-white hover:bg-white hover:text-maroon"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button 
                  onClick={onLogin}
                  className="w-full px-4 py-2 rounded border border-white hover:bg-white hover:text-maroon"
                >
                  {t('login')}
                </button>
                <button 
                  onClick={onRegister}
                  className="w-full px-4 py-2 rounded bg-white text-maroon hover:bg-gray-100"
                >
                  {t('register')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
