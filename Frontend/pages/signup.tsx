import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Signup.module.css';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Şifreler eşleşmiyor!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/createuser', {
        username,
        password,
        email,
      });
      console.log(response.data);
      alert("Kayıt başarılı!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Kayıt sırasında bir hata oluştu:", error.response?.data || error.message);
        alert(`Kayıt sırasında bir hata oluştu: ${error.response?.data?.message || error.message}`);
      } else {
        console.error("Bilinmeyen bir hata oluştu:", error);
        alert("Kayıt sırasında bilinmeyen bir hata oluştu.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form className={styles.form} onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Password Again:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
