import { useState } from 'react';
import axios from 'axios';

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleClick() {
    try {
      const response = await axios.get(
        'https://fsa-jwt-practice.herokuapp.com/authenticate',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.data;

      if (result && result.data && result.data.username) {
        setSuccessMessage(result.data.username);
      } else {
        throw new Error('Username not found in response.');
      }
    } catch (e) {
      setError(e.message);
    }
  }
  return (
    <>
      <h2>Authenticate</h2>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
