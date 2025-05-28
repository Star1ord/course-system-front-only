import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Mock request interceptor
api.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock data for development
const mockApi = {
  'auth/login': {
    user: {
      id: 1,
      first_name: 'Togzhan',
      surname: 'Yermekbayeva',
      email: 'example@dmuk.edu.kz',
      role: 'Student',
      department: 'Computer Science',
      user_type: 'student'
    },
    token: 'mock-jwt-token'
  },
  'auth/register': {
    user: {
      id: 1,
      first_name: 'Togzhan',
      surname: 'Yermekbayeva',
      email: 'example@dmuk.edu.kz',
      role: 'Student',
      department: 'Computer Science',
      user_type: 'student'
    },
    token: 'mock-jwt-token'
  },
  'courses': [
    {
      id: 1,
      title: 'Introduction to Programming',
      description: 'Learn the basics of programming',
      duration: '12 weeks',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'Web Development',
      description: 'Learn modern web development',
      duration: '16 weeks',
      level: 'Intermediate'
    }
  ],
  'modules': [
    {
      id: 1,
      name: 'Python Basics',
      course: 'Introduction to Programming',
      description: 'Learn Python programming fundamentals',
      duration: '4 weeks',
      level: 'Beginner',
      status: 'not started'
    },
    {
      id: 2,
      name: 'HTML & CSS',
      course: 'Web Development',
      description: 'Learn web development basics',
      duration: '6 weeks',
      level: 'Beginner',
      status: 'in progress'
    }
  ],
  'user/profile': {
    id: 1,
    first_name: 'Togzhan',
    surname: 'Yermekbayeva',
    email: 'example@dmuk.edu.kz',
    role: 'Student',
    department: 'Computer Science',
    user_type: 'student',
    registered_modules: [
      {
        id: 1,
        name: 'Python Basics',
        course: 'Introduction to Programming',
        status: 'completed',
        progress: 100,
        start_date: '2024-01-01',
        end_date: '2024-04-01'
      },
      {
        id: 2,
        name: 'HTML & CSS',
        course: 'Web Development',
        status: 'in progress',
        progress: 60,
        start_date: '2024-04-01',
        end_date: '2024-07-01'
      },
      {
        id: 3,
        name: 'JavaScript Fundamentals',
        course: 'Web Development',
        status: 'not started',
        progress: 0,
        start_date: '2024-07-01',
        end_date: '2024-10-01'
      }
    ]
  }
};

// Mock response interceptor
api.interceptors.response.use(
  (response) => {
    // Check if the request URL matches any mock endpoint
    const url = response.config.url;
    const endpoint = url.startsWith('/') ? url.substring(1) : url;
    
    if (mockApi[endpoint]) {
      return { data: mockApi[endpoint] };
    }

    return response;
  },
  (error) => {
    // If the request fails, check if we have mock data for this endpoint
    const url = error.config.url;
    const endpoint = url.startsWith('/') ? url.substring(1) : url;
    
    if (mockApi[endpoint]) {
      return Promise.resolve({ data: mockApi[endpoint] });
    }

    return Promise.reject(error);
  }
);

export default api; 