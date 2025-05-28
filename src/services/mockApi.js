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
    title: "Computer Science",
    description: "The Computer Science program provides a solid foundation in programming, algorithms, and software systems. Students will develop problem-solving skills using a range of modern technologies and programming paradigms. The course prepares graduates for roles in software development, data analysis, and systems architecture.",
    contents: "Students will study key topics including object-oriented programming, database design, functional languages like Scala, and operating systems. The curriculum is structured to support both theoretical knowledge and hands-on experience."
  },
  {
    id: 2,
    title: "Software Engineering",
    description: "This program focuses on the methodologies, tools, and techniques required to build large-scale software systems. Students will learn how to apply software development life cycles, manage projects, and implement quality assurance practices. Emphasis is placed on design thinking and usability.",
    contents: "Topics include agile development, user-centered design, testing frameworks, and knowledge-based systems. Students gain practical experience through labs and collaborative development projects."
  },
  {
    id: 3,
    title: "Cyber Security",
    description: "The Cyber Security program prepares students to secure systems, detect threats, and respond to cyber incidents. It combines theoretical foundations with practical training in defensive and offensive security strategies. Students will explore topics such as ethical hacking, secure software, and cyber law.",
    contents: "Key components include network security, Linux system hardening, legal frameworks, and incident response planning. Graduates will be ready to pursue roles in penetration testing, security analysis, and cyber operations."
  }
];

const mockModules = [
  {
    id: 1,
    code: "COS1903",
    title: "Scala Programming",
    description: "This module introduces students to functional programming using Scala, a language known for its scalability and expressiveness. Students will explore recursion, immutability, and pattern matching.",
    contents: "Topics include recursion, pattern matching, collections, and functional design principles.",
    course_id: 1
  },
  {
    id: 2,
    code: "COS1920",
    title: "Database Management",
    description: "A foundational module in relational database design, SQL, and data modeling. It covers normalization, entity-relationship modeling, and efficient query writing.",
    contents: "SQL, relational modeling, normalization, and query optimization with hands-on practice.",
    course_id: 1
  },
  {
    id: 5,
    code: "SE3906",
    title: "Interaction Design",
    description: "Students explore how to design interactive systems that prioritize usability and user satisfaction. This module emphasizes iterative design, prototyping, and evaluation.",
    contents: "User experience design principles, wireframing, prototyping, usability testing, and heuristics.",
    course_id: 2
  }
];

const mockStaff = [
  {
    id: 1,
    first_name: "Ayan",
    surname: "Saparov",
    email: "ayan@dmuk.edu.kz",
    position: "Senior Lecturer",
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
    return mockModules.filter(module => module.course_id === parseInt(courseId));
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

export default mockApi; 