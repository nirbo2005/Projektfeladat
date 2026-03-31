/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import './App.css';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  color: string;
  rating: number;
  releaseYear: number;
  published: boolean;
}

const API_URL = 'http://localhost:3000/product';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Hiba a termékek lekérésekor:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdate = async (id: number, updates: Partial<Product>) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchProducts();
    } catch (error) {
      console.error("Hiba a frissítéskor:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error("Hiba a törléskor:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">📦 Termékkezelő Rendszer</h1>
      
      <ProductForm onProductAdded={fetchProducts} apiUrl={API_URL} />

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default App;