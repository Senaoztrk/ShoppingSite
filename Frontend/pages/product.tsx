// pages/products.tsx

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Products.module.css';

interface Product {
  id: number;
  product_name: string;
  explanation: string;
  price: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:8080/getallproduct');
        setProducts(productsResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:8080/deleteproduct/${id}`);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred while deleting the product');
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Products</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Link href="/addproduct" legacyBehavior>
        <a className={styles.addButton}>Add Product</a>
      </Link>
      {products.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Explanation</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.explanation}</td>
                <td>{product.price} ₺</td>
                <td>
                  <Link href={`/updateproduct/${product.id}`} legacyBehavior>
                    <a className={styles.updateButton}>Update</a>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductsPage;
