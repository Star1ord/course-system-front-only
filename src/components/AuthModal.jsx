import React, { useState } from 'react';
import api from '../services/api';

export default function AuthModal({ type, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const url = type === 'login' ? '/auth/login' : '/auth/register';
    const payload = type === 'register'
      ? { first_name: 'Demo', surname: 'User', email, password, user_type: 'student' }
      : { email, password };

    try {
      const res = await api.post(url, payload);
      if (type === 'login') {
        localStorage.setItem('jwt', res.data.token);
        alert('Login successful');
      } else {
        alert('Registration successful');
      }
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <button onClick={onClose} className="float-right text-red-500 font-bold">&times;</button>
        <h3 className="text-lg font-semibold mb-4">{type === 'login' ? 'Login' : 'Register'}</h3>
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleSubmit} className="bg-maroon text-white px-4 py-2 rounded w-full">
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  );
}
