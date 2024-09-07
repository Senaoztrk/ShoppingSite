import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [explanation, setExplanation] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kategori nesnesi oluştur
    const category = {
      id: categoryId || 0, // Kategori ID'si (Opsiyonel)
      category_name: categoryName,
      products: [], // Kategoriye ait ürünler, boş liste olarak gönder
    };

    try {
      await axios.post('http://localhost:8080/createproduct', {
        id: 0, // Genellikle sunucu tarafından atanır
        product_name: name,
        price,
        explanation,
        category,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(()=>{router.push('/product')});
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="container">
      <h1>Add New Product</h1>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="explanation">Explanation:</label>
          <input
            type="text"
            id="explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryName">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">Category ID:</label>
          <input
            type="number"
            id="categoryId"
            value={categoryId || ''}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          />
        </div>
        <button type="submit">Add</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #ffff;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        div {
          margin-bottom: 1rem;
        }
        label {
          margin-bottom: 0.5rem;
          display: block;
        }
        input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          padding: 0.5rem;
          border: none;
          background-color: #0070f3;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default AddProductPage;
