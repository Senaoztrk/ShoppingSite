import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Category.module.css';
import Link from 'next/link';

interface Category {
  id: number;
  category_name: string;
  products: {
    id: number;
    product_name: string;
    price: number;
    explanation: string;
    category: string;
  }[];
}

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getallcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Kategorileri getirirken bir hata oluştu:', error);
        setError(error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu');
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Kategoriler</h1>
      {error && <p className={styles.error}>{error}</p>}
      <ul className={styles.categoryList}>
        {categories.map(category => (
          <li key={category.id} className={styles.categoryItem}>
            <h2 className={styles.categoryItemTitle}>{category.category_name}</h2>
            <p className={styles.categoryItemDescription}>Kategori açıklaması burada.</p>
            <Link href={`/category/${category.id}`} className={styles.link}>
              Detayları Gör
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
