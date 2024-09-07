// pages/about.tsx
import React from 'react';
import styles from '../styles/About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hakkımızda</h1>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Şirketimiz</h2>
        <p className={styles.sectionParagraph}>Pinsoft</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Misyon ve Vizyon</h2>
        <p className={styles.sectionParagraph}>Kullanıcıların memnun kaldığı bir site oluşturmak.</p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ekibimiz</h2>
        <p className={styles.sectionParagraph}>Senanur Öztürk-Osmangazi Üniversitesi Bilgisayar Mühendisliği öğrencisi</p>
      </div>
    </div>
  );
};

export default About;
