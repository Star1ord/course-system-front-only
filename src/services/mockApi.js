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

const mockModules = [
  {
    id: 1,
    code: "COS1903",
    title: {
      en: "Scala Programming",
      ru: "Программирование на Scala"
    },
    description: {
      en: "This module introduces students to functional programming using Scala, a language known for its scalability and expressiveness. Students will explore recursion, immutability, and pattern matching.",
      ru: "Этот модуль знакомит студентов с функциональным программированием на Scala, языке, известном своей масштабируемостью и выразительностью. Студенты изучат рекурсию, неизменяемость и сопоставление с образцом."
    },
    contents: {
      en: "By the end of the module, learners will build functional programs and understand the role of Scala in data processing and backend development.",
      ru: "К концу модуля учащиеся будут создавать функциональные программы и понимать роль Scala в обработке данных и серверной разработке."
    },
    course_id: 1
  },
  {
    id: 2,
    code: "COS1920",
    title: {
      en: "Database Management",
      ru: "Управление базами данных"
    },
    description: {
      en: "A foundational module in relational database design, SQL, and data modeling. It covers normalization, entity-relationship modeling, and efficient query writing.",
      ru: "Фундаментальный модуль по проектированию реляционных баз данных, SQL и моделированию данных. Он охватывает нормализацию, моделирование связей сущностей и написание эффективных запросов."
    },
    contents: {
      en: "Students will practice creating databases, writing optimized queries, and managing integrity constraints in PostgreSQL.",
      ru: "Студенты будут практиковаться в создании баз данных, написании оптимизированных запросов и управлении ограничениями целостности в PostgreSQL."
    },
    course_id: 1
  },
  {
    id: 3,
    code: "COS2905",
    title: {
      en: "Object Oriented Programming (Java)",
      ru: "Объектно-ориентированное программирование (Java)"
    },
    description: {
      en: "This module focuses on core OOP concepts such as inheritance, encapsulation, and polymorphism using Java. Students will design and implement class hierarchies and reusable code.",
      ru: "Этот модуль фокусируется на основных концепциях ООП, таких как наследование, инкапсуляция и полиморфизм с использованием Java. Студенты будут проектировать и реализовывать иерархии классов и переиспользуемый код."
    },
    contents: {
      en: "Projects include building command-line applications and basic graphical user interfaces.",
      ru: "Проекты включают создание консольных приложений и базовых графических пользовательских интерфейсов."
    },
    course_id: 1
  },
  {
    id: 4,
    code: "COS2910",
    title: {
      en: "Database Management",
      ru: "Управление базами данных"
    },
    description: {
      en: "An advanced continuation of Database Management, this module explores complex SQL queries, transactions, and indexing strategies. It also introduces NoSQL concepts.",
      ru: "Продвинутое продолжение курса по управлению базами данных, этот модуль исследует сложные SQL-запросы, транзакции и стратегии индексирования. Также вводит концепции NoSQL."
    },
    contents: {
      en: "Students will work with stored procedures, triggers, and understand the trade-offs of relational vs non-relational models.",
      ru: "Студенты будут работать с хранимыми процедурами, триггерами и понимать компромиссы между реляционными и нереляционными моделями."
    },
    course_id: 1
  },
  {
    id: 5,
    code: "SE3906",
    title: {
      en: "Interaction Design",
      ru: "Дизайн взаимодействия"
    },
    description: {
      en: "Students explore how to design interactive systems that prioritize usability and user satisfaction. This module emphasizes iterative design, prototyping, and evaluation.",
      ru: "Студенты изучают, как проектировать интерактивные системы, которые отдают приоритет удобству использования и удовлетворенности пользователей. Этот модуль подчеркивает итеративное проектирование, прототипирование и оценку."
    },
    contents: {
      en: "Assignments include developing user personas, wireframes, and conducting usability tests.",
      ru: "Задания включают разработку пользовательских персонажей, каркасов и проведение тестов на удобство использования."
    },
    course_id: 2
  },
  {
    id: 6,
    code: "SE3410",
    title: {
      en: "Web Application Penetration Testing",
      ru: "Тестирование на проникновение веб-приложений"
    },
    description: {
      en: "Focuses on identifying and exploiting common web vulnerabilities. Students will learn how to test applications using industry tools and standards.",
      ru: "Фокусируется на выявлении и использовании распространенных уязвимостей веб-приложений. Студенты научатся тестировать приложения с использованием отраслевых инструментов и стандартов."
    },
    contents: {
      en: "Topics include OWASP Top 10, SQL injection, XSS, CSRF, and mitigation strategies.",
      ru: "Темы включают OWASP Top 10, SQL-инъекции, XSS, CSRF и стратегии смягчения."
    },
    course_id: 2
  },
  {
    id: 7,
    code: "SE3406",
    title: {
      en: "Fuzzy Logic & Knowledge Based Systems",
      ru: "Нечеткая логика и системы на основе знаний"
    },
    description: {
      en: "This module introduces students to fuzzy logic theory and its application in building intelligent systems. Students will explore fuzzy inference engines and rule-based decision making.",
      ru: "Этот модуль знакомит студентов с теорией нечеткой логики и ее применением в построении интеллектуальных систем. Студенты изучат механизмы нечеткого вывода и принятие решений на основе правил."
    },
    contents: {
      en: "Use cases include fuzzy control systems and decision support applications.",
      ru: "Примеры использования включают системы нечеткого управления и приложения поддержки принятия решений."
    },
    course_id: 2
  },
  {
    id: 8,
    code: "SE3613",
    title: {
      en: "Data Mining",
      ru: "Добыча данных"
    },
    description: {
      en: "Covers methods of discovering patterns and insights in large datasets. Students learn classification, clustering, and association rule learning.",
      ru: "Охватывает методы обнаружения паттернов и инсайтов в больших наборах данных. Студенты изучают классификацию, кластеризацию и обучение правилам ассоциации."
    },
    contents: {
      en: "Practical components include using tools like WEKA or Python libraries for mining structured data.",
      ru: "Практические компоненты включают использование инструментов, таких как WEKA или библиотеки Python для добычи структурированных данных."
    },
    course_id: 2
  },
  {
    id: 9,
    code: "SE3901",
    title: {
      en: "C Programming",
      ru: "Программирование на C"
    },
    description: {
      en: "Students will develop low-level programming skills in C, focusing on memory management, pointers, and system-level programming.",
      ru: "Студенты разовьют навыки низкоуровневого программирования на C, фокусируясь на управлении памятью, указателях и системном программировании."
    },
    contents: {
      en: "This module prepares students for future courses in systems programming and embedded development.",
      ru: "Этот модуль готовит студентов к будущим курсам по системному программированию и разработке встраиваемых систем."
    },
    course_id: 3
  },
  {
    id: 10,
    code: "SE3902",
    title: {
      en: "Computer Law and Cyber Security Management",
      ru: "Компьютерное право и управление кибербезопасностью"
    },
    description: {
      en: "Covers the legal and organizational aspects of cybersecurity. Topics include data protection laws, risk management, and compliance frameworks.",
      ru: "Охватывает правовые и организационные аспекты кибербезопасности. Темы включают законы о защите данных, управление рисками и рамки соответствия."
    },
    contents: {
      en: "Students analyze case studies and develop policy recommendations based on best practices.",
      ru: "Студенты анализируют кейсы и разрабатывают рекомендации по политике на основе лучших практик."
    },
    course_id: 3
  },
  {
    id: 11,
    code: "SE3903",
    title: {
      en: "Linux Security",
      ru: "Безопасность Linux"
    },
    description: {
      en: "This module teaches students how to secure Linux operating systems and services. Topics include access control, file permissions, and firewall configuration.",
      ru: "Этот модуль учит студентов, как защищать операционные системы и сервисы Linux. Темы включают контроль доступа, разрешения файлов и настройку брандмауэра."
    },
    contents: {
      en: "Labs involve configuring secure SSH, managing audit logs, and hardening distributions.",
      ru: "Лабораторные работы включают настройку безопасного SSH, управление журналами аудита и укрепление дистрибутивов."
    },
    course_id: 3
  },
  {
    id: 12,
    code: "SE3904",
    title: {
      en: "Cyber Threat Intelligence and Incident Response",
      ru: "Киберразведка и реагирование на инциденты"
    },
    description: {
      en: "Focuses on how to identify, analyze, and respond to cyber threats. Students learn about threat modeling, SOC operations, and incident handling techniques.",
      ru: "Фокусируется на том, как выявлять, анализировать и реагировать на киберугрозы. Студенты изучают моделирование угроз, операции SOC и методы обработки инцидентов."
    },
    contents: {
      en: "Scenarios include building response plans and simulating cyber attacks in lab environments.",
      ru: "Сценарии включают создание планов реагирования и моделирование кибератак в лабораторных условиях."
    },
    course_id: 3
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