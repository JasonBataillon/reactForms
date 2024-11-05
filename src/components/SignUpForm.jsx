import { useState } from 'react';
import axios from 'axios';

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (username.length < 8) throw 'Username is too short';
      if (password.length < 5) throw 'Password is too short';
      if (username === '') throw 'Please enter a username';
      if (password === '') throw 'Please enter a password';
      const response = await axios.post(
        'https://fsa-jwt-practice.herokuapp.com/signup',
        { username, password }
      );
      const result = await response.data;
      setToken(result.token);
      // setToken(await response.data.token)
    } catch (e) {
      setError(e);
    }
  }

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{' '}
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
