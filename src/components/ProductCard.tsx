import { Product } from '@/types';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'large';
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="block animate-fade-in"
    >
      <div className="card-product relative group">
        <div className={`relative overflow-hidden ${variant === 'large' ? 'aspect-[3/4]' : 'aspect-square'}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        <button 
            className="absolute bottom-3 right-3 w-8 h-8 bg-foreground rounded-full flex items-center justify-center shadow-md transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ShoppingBag className="w-4 h-4 text-background" />
          </button>
        </div>
      </div>
      <div className="mt-2 px-1">
        <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">{product.name}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
