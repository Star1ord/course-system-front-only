// Mock data based on the actual database structure
const mockUsers = [
  {
    id: 1,
    first_name: "Aliya",
    surname: "Yermakhan",
    email: "aliya@dmuk.edu.kz",
    user_type: "student"
  },
  {
    id: 2,
    first_name: "Daulet",
    surname: "Nurlybek",
    email: "daulet@dmuk.edu.kz",
    user_type: "student"
  },
  {
    id: 5,
    first_name: "Ayan",
    surname: "Saparov",
    email: "ayan@dmuk.edu.kz",
    user_type: "instructor"
  }
];

const mockCourses = [
  {
    id: 1,
    title: {
      en: "Computer Science",
      ru: "Информатика"
    },
    description: {
      en: "The Computer Science program provides a solid foundation in programming, algorithms, and software systems. Students will develop problem-solving skills using a range of modern technologies and programming paradigms. The course prepares graduates for roles in software development, data analysis, and systems architecture.",
      ru: "Программа по информатике обеспечивает прочную основу в программировании, алгоритмах и программных системах. Студенты разовьют навыки решения проблем, используя различные современные технологии и парадигмы программирования. Курс готовит выпускников к работе в области разработки программного обеспечения, анализа данных и системной архитектуры."
    },
    contents: {
      en: "Students will study key topics including object-oriented programming, database design, functional languages like Scala, and operating systems. The curriculum is structured to support both theoretical knowledge and hands-on experience.",
      ru: "Студенты будут изучать ключевые темы, включая объектно-ориентированное программирование, проектирование баз данных, функциональные языки, такие как Scala, и операционные системы. Учебный план структурирован для поддержки как теоретических знаний, так и практического опыта."
    }
  },
  {
    id: 2,
    title: {
      en: "Software Engineering",
      ru: "Инженерное программное обеспечение"
    },
    description: {
      en: "This program focuses on the methodologies, tools, and techniques required to build large-scale software systems. Students will learn how to apply software development life cycles, manage projects, and implement quality assurance practices. Emphasis is placed on design thinking and usability.",
      ru: "Эта программа фокусируется на методологиях, инструментах и техниках, необходимых для создания крупномасштабных программных систем. Студенты научатся применять жизненные циклы разработки программного обеспечения, управлять проектами и внедрять практики обеспечения качества. Особое внимание уделяется дизайн-мышлению и удобству использования."
    },
    contents: {
      en: "Topics include agile development, user-centered design, testing frameworks, and knowledge-based systems. Students gain practical experience through labs and collaborative development projects.",
      ru: "Темы включают гибкую разработку, пользовательский дизайн, фреймворки тестирования и системы на основе знаний. Студенты получают практический опыт через лабораторные работы и совместные проекты разработки."
    }
  },
  {
    id: 3,
    title: {
      en: "Cyber Security",
      ru: "Кибербезопасность"
    },
    description: {
      en: "The Cyber Security program prepares students to secure systems, detect threats, and respond to cyber incidents. It combines theoretical foundations with practical training in defensive and offensive security strategies. Students will explore topics such as ethical hacking, secure software, and cyber law.",
      ru: "Программа по кибербезопасности готовит студентов к защите систем, обнаружению угроз и реагированию на киберинциденты. Она сочетает теоретические основы с практической подготовкой в области оборонительных и наступательных стратегий безопасности. Студенты изучат такие темы, как этичный хакинг, безопасное программное обеспечение и киберправо."
    },
    contents: {
      en: "Key components include network security, Linux system hardening, legal frameworks, and incident response planning. Graduates will be ready to pursue roles in penetration testing, security analysis, and cyber operations.",
      ru: "Ключевые компоненты включают сетевую безопасность, укрепление систем Linux, правовые рамки и планирование реагирования на инциденты. Выпускники будут готовы к работе в области тестирования на проникновение, анализа безопасности и киберопераций."
    }
  }
];

export const mockModules = [
  {
    id: 1,
    code: 'COS1903',
    title: {
      en: 'Scala Programming',
      ru: 'Программирование на Scala'
    },
    description: {
      en: 'Introduction to Scala programming language and functional programming concepts.',
      ru: 'Введение в язык программирования Scala и концепции функционального программирования.'
    },
    contents: {
      en: 'Topics include recursion, pattern matching, collections, and functional design principles.',
      ru: 'Темы включают рекурсию, сопоставление с образцом, коллекции и принципы функционального проектирования.'
    },
    course_id: 1,
    instructor: {
      id: 1,
      first_name: 'Ayan',
      surname: 'Saparov',
      email: 'ayan@dmuk.edu.kz',
      position: 'Senior Lecturer'
    }
  },
  {
    id: 2,
    code: 'COS1920',
    title: {
      en: 'Database Management',
      ru: 'Управление базами данных'
    },
    description: {
      en: 'Fundamentals of database design and management.',
      ru: 'Основы проектирования и управления базами данных.'
    },
    contents: {
      en: 'SQL, relational modeling, normalization, and query optimization with hands-on practice.',
      ru: 'SQL, реляционное моделирование, нормализация и оптимизация запросов с практическими занятиями.'
    },
    course_id: 1,
    instructor: {
      id: 1,
      first_name: 'Ayan',
      surname: 'Saparov',
      email: 'ayan@dmuk.edu.kz',
      position: 'Senior Lecturer'
    }
  },
  {
    id: 3,
    code: 'COS2905',
    title: {
      en: 'Object Oriented Programming (Java)',
      ru: 'Объектно-ориентированное программирование (Java)'
    },
    description: {
      en: 'Advanced object-oriented programming concepts using Java.',
      ru: 'Продвинутые концепции объектно-ориентированного программирования с использованием Java.'
    },
    contents: {
      en: 'Encapsulation, inheritance, polymorphism using Java. Project-based learning with OOP design.',
      ru: 'Инкапсуляция, наследование, полиморфизм с использованием Java. Обучение на основе проектов с ООП дизайном.'
    },
    course_id: 1,
    instructor: {
      id: 2,
      first_name: 'Nurzhan',
      surname: 'Amir',
      email: 'nurzhan@dmuk.edu.kz',
      position: 'Instructor'
    }
  },
  {
    id: 4,
    code: 'COS2910',
    title: {
      en: 'Advanced Database Systems',
      ru: 'Продвинутые системы баз данных'
    },
    description: {
      en: 'Advanced concepts in database systems and management.',
      ru: 'Продвинутые концепции в системах и управлении базами данных.'
    },
    contents: {
      en: 'Complex SQL queries, indexing strategies, stored procedures, and introduction to NoSQL systems.',
      ru: 'Сложные SQL-запросы, стратегии индексации, хранимые процедуры и введение в NoSQL системы.'
    },
    course_id: 1,
    instructor: {
      id: 2,
      first_name: 'Nurzhan',
      surname: 'Amir',
      email: 'nurzhan@dmuk.edu.kz',
      position: 'Instructor'
    }
  },
  {
    id: 5,
    code: 'SE3906',
    title: {
      en: 'Interaction Design',
      ru: 'Дизайн взаимодействия'
    },
    description: {
      en: 'Principles and practices of user interface and interaction design.',
      ru: 'Принципы и практики дизайна пользовательского интерфейса и взаимодействия.'
    },
    contents: {
      en: 'User experience design principles, wireframing, prototyping, usability testing, and heuristics.',
      ru: 'Принципы дизайна пользовательского опыта, создание макетов, прототипирование, тестирование удобства использования и эвристики.'
    },
    course_id: 2,
    instructor: {
      id: 1,
      first_name: 'Ayan',
      surname: 'Saparov',
      email: 'ayan@dmuk.edu.kz',
      position: 'Senior Lecturer'
    }
  },
  {
    id: 6,
    code: 'SE3410',
    title: {
      en: 'Web Application Penetration Testing',
      ru: 'Тестирование на проникновение веб-приложений'
    },
    description: {
      en: 'Security testing and vulnerability assessment of web applications.',
      ru: 'Тестирование безопасности и оценка уязвимостей веб-приложений.'
    },
    contents: {
      en: 'OWASP Top 10, SQLi, XSS, CSRF, pentesting tools, and mitigation techniques for web applications.',
      ru: 'OWASP Top 10, SQL-инъекции, XSS, CSRF, инструменты тестирования на проникновение и методы защиты веб-приложений.'
    },
    course_id: 2,
    instructor: {
      id: 2,
      first_name: 'Nurzhan',
      surname: 'Amir',
      email: 'nurzhan@dmuk.edu.kz',
      position: 'Instructor'
    }
  },
  {
    id: 7,
    code: 'SE3406',
    title: {
      en: 'Fuzzy Logic & Knowledge Based Systems',
      ru: 'Нечеткая логика и системы, основанные на знаниях'
    },
    description: {
      en: 'Introduction to fuzzy logic and knowledge-based systems.',
      ru: 'Введение в нечеткую логику и системы, основанные на знаниях.'
    },
    contents: {
      en: 'Fuzzy inference, rule-based logic, reasoning under uncertainty, and expert system design.',
      ru: 'Нечеткий вывод, логика на основе правил, рассуждения в условиях неопределенности и проектирование экспертных систем.'
    },
    course_id: 2,
    instructor: {
      id: 1,
      first_name: 'Ayan',
      surname: 'Saparov',
      email: 'ayan@dmuk.edu.kz',
      position: 'Senior Lecturer'
    }
  },
  {
    id: 8,
    code: 'SE3613',
    title: {
      en: 'Data Mining',
      ru: 'Добыча данных'
    },
    description: {
      en: 'Techniques and tools for data mining and analysis.',
      ru: 'Техники и инструменты для добычи и анализа данных.'
    },
    contents: {
      en: 'Classification, clustering, association rule mining using Python or WEKA. CRISP-DM process model.',
      ru: 'Классификация, кластеризация, поиск ассоциативных правил с использованием Python или WEKA. Модель процесса CRISP-DM.'
    },
    course_id: 2,
    instructor: {
      id: 2,
      first_name: 'Nurzhan',
      surname: 'Amir',
      email: 'nurzhan@dmuk.edu.kz',
      position: 'Instructor'
    }
  },
  {
    id: 9,
    code: 'SE3901',
    title: {
      en: 'C Programming',
      ru: 'Программирование на C'
    },
    description: {
      en: 'Advanced C programming concepts and system-level programming.',
      ru: 'Продвинутые концепции программирования на C и системное программирование.'
    },
    contents: {
      en: 'C language memory management, pointers, arrays, and low-level system interaction.',
      ru: 'Управление памятью в языке C, указатели, массивы и низкоуровневое системное взаимодействие.'
    },
    course_id: 3,
    instructor: {
      id: 1,
      first_name: 'Ayan',
      surname: 'Saparov',
      email: 'ayan@dmuk.edu.kz',
      position: 'Senior Lecturer'
    }
  },
  {
    id: 10,
    code: 'SE3902',
    title: {
      en: 'Computer Law and Cyber Security Management',
      ru: 'Компьютерное право и управление кибербезопасностью'
    },
    description: {
      en: 'Legal and management aspects of cybersecurity.',
      ru: 'Правовые и управленческие аспекты кибербезопасности.'
    },
    contents: {
      en: 'Kazakhstan and global cyber laws, data privacy, security policies, and risk management frameworks.',
      ru: 'Киберзаконы Казахстана и мира, конфиденциальность данных, политики безопасности и рамки управления рисками.'
    },
    course_id: 3,
    instructor: {
      id: 2,
      first_name: 'Nurzhan',
      surname: 'Amir',
      email: 'nurzhan@dmuk.edu.kz',
      position: 'Instructor'
    }
  },
  {
    id: 11,
    code: 'SE3903',
    title: {
      en: 'Linux Security',
      ru: 'Безопасность Linux'
    },
    description: {
      en: 'Security practices and tools for Linux systems.',
      ru: 'Практики и инструменты безопасности для систем Linux.'
    },
    contents: {
      en: 'Linux user/group security, firewall config, SSH, system auditing, and secure system setup.',
      ru: 'Безопасность пользователей/групп Linux, настройка брандмауэра, SSH, аудит системы и безопасная настройка системы.'
    },
    course_id: 3,
    instructor: {
      id: 1,
      first_name: 'Ayan',
      surname: 'Saparov',
      email: 'ayan@dmuk.edu.kz',
      position: 'Senior Lecturer'
    }
  },
  {
    id: 12,
    code: 'SE3904',
    title: {
      en: 'Cyber Threat Intelligence and Incident Response',
      ru: 'Киберразведка угроз и реагирование на инциденты'
    },
    description: {
      en: 'Threat intelligence and incident response in cybersecurity.',
      ru: 'Разведка угроз и реагирование на инциденты в кибербезопасности.'
    },
    contents: {
      en: 'Threat modeling, incident handling, cyber forensics basics, and SOC workflows.',
      ru: 'Моделирование угроз, обработка инцидентов, основы кибер-криминалистики и рабочие процессы SOC.'
    },
    course_id: 3,
    instructor: {
      id: 2,
      first_name: 'Nurzhan',
      surname: 'Amir',
      email: 'nurzhan@dmuk.edu.kz',
      position: 'Instructor'
    }
  }
];

const mockStaff = [
  {
    id: 1,
    first_name: "Ayan",
    surname: "Saparov",
    email: "ayan@dmuk.edu.kz",
    position: {
      en: "Senior Lecturer",
      ru: "Старший преподаватель"
    },
    user_id: 5
  }
];

// Mock API functions
const mockApi = {
  // Auth
  login: async (credentials) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockUsers.find(u => u.email === credentials.email);
    if (!user) throw new Error('Invalid credentials');
    return {
      user,
      token: "mock-jwt-token"
    };
  },

  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: { ...userData, id: mockUsers.length + 1 },
      token: "mock-jwt-token"
    };
  },

  // Courses
  getCourses: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses;
  },

  getCourse: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockCourses.find(course => course.id === parseInt(id));
  },

  // Modules
  getModules: async (courseId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (courseId) {
      return mockModules.filter(module => module.course_id === parseInt(courseId));
    }
    return mockModules;
  },

  getModule: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockModules.find(module => module.id === parseInt(id));
  },

  // User
  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers[0]; // Return first user as current user
  },

  // Staff
  getStaff: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStaff;
  }
};

// Helper function to get translated content
export const getTranslatedContent = (content, language) => {
  if (typeof content === 'object' && content !== null) {
    return content[language] || content.en || content;
  }
  return content;
};

export default mockApi; 