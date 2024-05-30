import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (username === 'user' && password === '123') {
      localStorage.setItem('isLoggedIn', true);
      onLogin();
    } else {
      setAlert('Invalid username or password (hint: user, 123)');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn w-full rounded-full bg-sky-500 text-white hover:text-black">Login</button>
          </div>
          {alert && <p className="text-red-500 text-xs italic mt-4">{alert}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
