import { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';
import { Product, Category } from '@/types';
import { getProducts } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import GridLogo from '@/components/GridLogo';
import BottomNav from '@/components/BottomNav';

const categories: { id: Category; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'kids', label: 'Kids' },
  { id: 'other', label: 'Other' },
];

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="page-container">
      {/* Header */}
      <header className="px-4 py-4 flex items-center justify-between">
        <button className="header-icon text-foreground">
          <GridLogo />
        </button>
        <button className="header-icon">
          <Circle className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </header>

      {/* Title */}
      <div className="px-4 pt-2 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Explore</h1>
        <p className="text-muted-foreground">Best trendy collection!</p>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Products Grid */}
      <div className="px-4">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-secondary rounded-2xl" />
                <div className="mt-2 h-5 bg-secondary rounded w-20" />
                <div className="mt-1 h-4 bg-secondary rounded w-28" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product}
                variant={index % 2 === 0 ? 'large' : 'default'}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default HomePage;
