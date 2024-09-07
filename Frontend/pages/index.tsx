import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Giriş bilgilerini kontrol et
    if (username === 'admin' && password === 'admin') {
      // Giriş bilgileri doğruysa ürünler sayfasına yönlendir
      router.push('/product');
    } else {
      // Giriş bilgileri yanlışsa ana sayfaya yönlendir
      router.push('/homepage');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Log In</h1>
      <form className={styles.form} onSubmit={handleLogin}>
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
        <p>
          Not a member? <Link href="/signup" legacyBehavior><a>Sign Up</a></Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
