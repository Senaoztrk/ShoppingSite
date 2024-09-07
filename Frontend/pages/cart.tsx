import { useEffect, useState } from 'react';
import styles from '../styles/Cart.module.css';

interface Product {
  id: number;
  product_name: string;
  explanation: string;
  price: number;
  categoryId: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // Sepet verilerini localStorage'dan al ve state'e ayarla
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Cart</h1>
      {cart.length > 0 ? (
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Explanation</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.explanation}</td>
                <td>{product.price} ₺</td>
              </tr>
            ))}
          </tbody>æ
        </table>
      ) : (
        <p>Cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
