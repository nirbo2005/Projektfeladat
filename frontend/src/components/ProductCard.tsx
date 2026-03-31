import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Switch from '@radix-ui/react-switch';
import { type Product } from '../App';

interface Props {
  product: Product;
  onUpdate: (id: number, updates: Partial<Product>) => void;
  onDelete: (id: number) => void;
}

const COLORS = [
  { id: 'Piros', code: '#ef4444' },
  { id: 'Kék', code: '#3b82f6' },
  { id: 'Zöld', code: '#22c55e' },
  { id: 'Sárga', code: '#eab308' },
  { id: 'Fekete', code: '#1f2937' }
];

// 1-től 10-ig egy tömb a csillagok generálásához
const STARS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function ProductCard({ product, onUpdate, onDelete }: Props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{product.name} <span className="year">({product.releaseYear})</span></h3>
        <button className="icon-btn delete-btn" onClick={() => onDelete(product.id)} title="Törlés">🗑️</button>
      </div>
      
      <p className="price">{product.price.toLocaleString('hu-HU')} Ft</p>
      
      {/* Készlet */}
      <div className="flex-row">
        <span>Raktáron: <strong>{product.stock}</strong> db</span>
        <div className="flex-gap">
          <button className="stock-btn" onClick={() => onUpdate(product.id, { stock: Math.max(0, product.stock - 1) })}>➖</button>
          <button className="stock-btn" onClick={() => onUpdate(product.id, { stock: product.stock + 1 })}>➕</button>
        </div>
      </div>

      {/* Publikálás (Itt biztosítjuk a középre zárt elrendezést) */}
      <div className="flex-row align-center">
        <span className={product.published ? 'published-text' : 'hidden-text'}>
          {product.published ? '✅ Publikálva' : '❌ Rejtve'}
        </span>
        <Switch.Root 
          className="SwitchRoot" 
          checked={product.published}
          onCheckedChange={(checked) => onUpdate(product.id, { published: checked })}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>

      {/* Színek */}
      <div className="section-margin">
        <p className="section-title">Szín:</p>
        <RadioGroup.Root
          className="RadioGroupRoot"
          value={product.color}
          onValueChange={(value) => onUpdate(product.id, { color: value })}
        >
          {COLORS.map((c) => (
            <label key={c.id} className="radio-item-wrapper">
              <RadioGroup.Item className="RadioGroupItem" value={c.id}>
                <RadioGroup.Indicator className="RadioGroupIndicator" style={{ backgroundColor: c.code }} />
              </RadioGroup.Item>
              <span className="radio-label">{c.id}</span>
            </label>
          ))}
        </RadioGroup.Root>
      </div>

      {/* INTERAKTÍV CSILLAGOS ÉRTÉKELÉS */}
      <div className="section-margin">
        <p className="section-title">Értékelés: {product.rating} / 10</p>
        <div className="stars-container">
          {STARS.map((star) => (
            <span
              key={star}
              // Ha a csillag sorszáma kisebb vagy egyenlő az értékelésnél, megkapja az 'active' osztályt
              className={`star ${star <= product.rating ? 'active' : ''}`}
              onClick={() => onUpdate(product.id, { rating: star })}
              title={`${star} csillag adása`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}