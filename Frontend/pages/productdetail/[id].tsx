import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/ProductDetail.module.css';

interface Product {
  id: number;
  product_name: string;
  price: number;
  explanation: string;
}

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get<Product>(`http://localhost:8080/getproduct/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product details', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>{product.product_name}</h1>
        <p>{product.price} ₺</p>
        <p>{product.explanation}</p>
        <button className={styles.addToCartButton} onClick={() => handleAddToCart(product)}>
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

const handleAddToCart = (product: Product) => {
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = [...existingCart, product];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  // İsteğe bağlı: Sepete eklendikten sonra bir şey yapabilirsiniz.
};

export default ProductDetail;
