import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../../styles/UpdateProduct.module.css'; // Yolun doğru olduğundan emin olun

interface Product {
  id: number;
  product_name: string;
  explanation: string;
  price: number;
}

const UpdateProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/getproduct/${id}`);
          setProduct(response.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setError(error.message);
          } else {
            setError('An unknown error occurred');
          }
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (product) {
      try {
        await axios.put(`http://localhost:8080/updateproduct/${product.id}`, product);
        router.push('/product');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred while updating the product');
        }
      }
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Update Product</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form className={styles.form} onSubmit={handleUpdate}>
        <div>
          <label className={styles.label}>
            Product Name:
            <input
              className={styles.input}
              type="text"
              value={product.product_name}
              onChange={(e) => setProduct({ ...product, product_name: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Explanation:
            <input
              className={styles.input}
              type="text"
              value={product.explanation}
              onChange={(e) => setProduct({ ...product, explanation: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Price:
            <input
              className={styles.input}
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
            />
          </label>
        </div>
        <button className={styles.button} type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProductPage;
