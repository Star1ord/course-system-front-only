import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Header
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    
    // Navbar
    home: 'Home',
    explore: 'Explore',
    courses: 'Courses',
    modules: 'Modules',
    about: 'About',
    contact: 'Contact',
    
    // Home Page
    welcomeToDMU: 'Welcome to Course System',
    heroDescription: 'Discover and enroll in courses that will help you achieve your goals.',
    exploreCourses: 'Browse Courses',
    getStarted: 'Get Started',
    
    // Profile
    myProfile: 'My Profile',
    personalInfo: 'Personal Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    role: 'Role',
    department: 'Department',
    registeredModules: 'Registered Modules',
    moduleName: 'Module Name',
    course: 'Course',
    status: 'Status',
    progress: 'Progress',
    noModules: 'No modules registered yet',
    startDate: 'Start Date',
    endDate: 'End Date',
    userNotFound: 'User not found',
    
    // Courses
    availableCourses: 'Available Courses',
    availableModules: 'Available Modules',
    enroll: 'Enroll Now',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    
    // Module Status
    completed: 'Completed',
    'in progress': 'In Progress',
    'not started': 'Not Started',
    
    // Footer
    allRightsReserved: 'All rights reserved.',
    facultyName: 'Faculty of Computing, Engineering and Media',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
  },
  ru: {
    // Header
    welcome: 'Добро пожаловать',
    login: 'Войти',
    register: 'Регистрация',
    logout: 'Выйти',
    profile: 'Профиль',
    
    // Navbar
    home: 'Главная',
    explore: 'Обзор',
    courses: 'Курсы',
    modules: 'Модули',
    about: 'О нас',
    contact: 'Контакты',
    
    // Home Page
    welcomeToDMU: 'Добро пожаловать в систему курсов',
    heroDescription: 'Откройте для себя и запишитесь на курсы, которые помогут вам достичь ваших целей.',
    exploreCourses: 'Просмотр курсов',
    getStarted: 'Начать',
    
    // Profile
    myProfile: 'Мой профиль',
    personalInfo: 'Личная информация',
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Электронная почта',
    role: 'Роль',
    department: 'Факультет',
    registeredModules: 'Зарегистрированные модули',
    moduleName: 'Название модуля',
    course: 'Курс',
    status: 'Статус',
    progress: 'Прогресс',
    noModules: 'Нет зарегистрированных модулей',
    startDate: 'Дата начала',
    endDate: 'Дата окончания',
    userNotFound: 'Пользователь не найден',
    
    // Courses
    availableCourses: 'Доступные курсы',
    availableModules: 'Доступные модули',
    enroll: 'Записаться',
    beginner: 'Начинающий',
    intermediate: 'Средний',
    advanced: 'Продвинутый',
    
    // Module Status
    completed: 'Завершен',
    'in progress': 'В процессе',
    'not started': 'Не начат',
    
    // Footer
    allRightsReserved: 'Все права защищены.',
    facultyName: 'Факультет вычислительной техники, инженерии и медиа',
    
    // Common
    loading: 'Загрузка...',
    error: 'Ошибка',
    save: 'Сохранить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    view: 'Просмотр',
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 