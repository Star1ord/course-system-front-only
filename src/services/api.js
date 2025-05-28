import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Mock interceptor for development
api.interceptors.request.use(config => {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const { token } = JSON.parse(userData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Mock response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // For development, return mock data instead of making actual API calls
    if (error.config.url.includes('/api')) {
      return Promise.resolve({
        data: mockApi[error.config.url.split('/api/')[1]]()
      });
    }
    return Promise.reject(error);
  }
);

// Mock API functions
const mockApi = {
  'auth/login': () => ({
    user: {
      id: 1,
      first_name: "Aliya",
      surname: "Yermakhan",
      email: "aliya@dmuk.edu.kz",
      user_type: "student"
    },
    token: "mock-jwt-token"
  }),
  'auth/register': () => ({
    user: {
      id: 2,
      first_name: "New",
      surname: "User",
      email: "new@dmuk.edu.kz",
      user_type: "student"
    },
    token: "mock-jwt-token"
  }),
  'courses': () => [
    {
      id: 1,
      title: "Computer Science",
      description: "The Computer Science program provides a solid foundation in programming, algorithms, and software systems.",
      contents: "Students will study key topics including object-oriented programming, database design, functional languages like Scala, and operating systems."
    },
    {
      id: 2,
      title: "Software Engineering",
      description: "This program focuses on the methodologies, tools, and techniques required to build large-scale software systems.",
      contents: "Topics include agile development, user-centered design, testing frameworks, and knowledge-based systems."
    }
  ],
  'modules': () => [
    {
      id: 1,
      code: "COS1903",
      title: "Scala Programming",
      description: "This module introduces students to functional programming using Scala.",
      contents: "Topics include recursion, pattern matching, collections, and functional design principles.",
      course_id: 1
    },
    {
      id: 2,
      code: "COS1920",
      title: "Database Management",
      description: "A foundational module in relational database design, SQL, and data modeling.",
      contents: "SQL, relational modeling, normalization, and query optimization with hands-on practice.",
      course_id: 1
    }
  ],
  'user/profile': () => ({
    id: 1,
    first_name: "Aliya",
    surname: "Yermakhan",
    email: "aliya@dmuk.edu.kz",
    user_type: "student",
    registered_courses: [
      {
        id: 1,
        title: "Computer Science",
        progress: 75
      }
    ]
  })
};

export default api; 