/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

interface Props {
  onProductAdded: () => void;
  apiUrl: string;
}

export default function ProductForm({ onProductAdded, apiUrl }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. JAVÍTÁS: Mentsük le a formot egy változóba azonnal!
    const formElement = e.currentTarget; 
    const formData = new FormData(formElement);
    
    const newProduct = {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      color: formData.get('color') as string,
      releaseYear: Number(formData.get('releaseYear')),
      rating: 0,
      published: false,
    };

    if (!newProduct.name || newProduct.name.trim() === '') return setError('A név megadása kötelező!');
    if (newProduct.price <= 0) return setError('Az árnak nagyobbnak kell lennie 0-nál!');
    if (newProduct.stock < 0) return setError('A készlet nem lehet negatív!');
    const currentYear = new Date().getFullYear();
    if (newProduct.releaseYear < 1900 || newProduct.releaseYear > currentYear + 1) {
      return setError(`Érvénytelen kiadási év! (1900 - ${currentYear + 1})`);
    }
    if (!newProduct.color) return setError('Kérlek válassz egy színt!');

    setError(null);
    setLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) throw new Error('Hiba történt a mentés során');
      
      // 2. JAVÍTÁS: Itt a lementett változót ürítjük ki az e.currentTarget helyett
      formElement.reset(); 
      onProductAdded();
    } catch (err: any) {
      // Így a pontos hibát is látni fogod, ha mégis gond lenne
      setError(`Nem sikerült a mentés: ${err.message}`); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>➕ Új termék felvétele</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="input-group">
        <input name="name" placeholder="Termék neve" required />
        <input name="price" type="number" placeholder="Ár (Ft)" required />
        <input name="stock" type="number" placeholder="Raktárkészlet (db)" required />
        <input name="releaseYear" type="number" placeholder="Kiadás éve" required />
        
        <select name="color" required defaultValue="">
          <option value="" disabled>Válassz színt...</option>
          <option value="Piros">Piros</option>
          <option value="Kék">Kék</option>
          <option value="Zöld">Zöld</option>
          <option value="Sárga">Sárga</option>
          <option value="Fekete">Fekete</option>
        </select>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Mentés...' : 'Termék Hozzáadása'}
      </button>
    </form>
  );
}