import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Homepage.module.css';
import { useRouter } from 'next/router';

interface Product {
  id: number;
  product_name: string;
  price: number;
  category: Category; // Category nesnesini doğrudan referans alır
  explanation: string; // Ürün açıklaması
}

interface Category {
  id: number;
  category_name: string;
}

const Homepage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter(); // Router'ı tanımlayın

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get<Product[]>('http://localhost:8080/getallproduct');
        setProducts(productsResponse.data);

        const categoriesResponse = await axios.get<Category[]>('http://localhost:8080/getallcategories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    router.push('/cart'); // Sepete ekledikten sonra Cart sayfasına yönlendir
  };

  const handleViewDetails = (productId: number) => {
    router.push(`/productdetail/${productId}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category.id);
    const matchesSearch = product.product_name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>Categories</h2>
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
            />
            {category.category_name}
          </label>
        ))}
        <h2>Search</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Ürün ara..."
        />
      </div>
      <div className={styles.mainContent}>
        <h1>Products</h1>
        <div className={styles.productList}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <h3>{product.product_name}</h3>
                <p>{product.price} ₺</p>
                <button
                  className={styles.addToCartButton}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className={styles.viewDetailsButton}
                  onClick={() => handleViewDetails(product.id)}
                >
                  See the details
                </button>
              </div>
            ))
          ) : (
            <p>Ürün bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
