import { CartItem as CartItemType } from '@/types';
import { Heart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItemCard = ({ item }: CartItemProps) => {
  const { removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-border animate-fade-in">
      <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground">{item.selectedColor.name}</p>
        <p className="text-sm text-muted-foreground">Size {item.selectedSize}</p>
        <p className="font-semibold mt-1">${item.product.price.toFixed(2)}</p>
      </div>
      
      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center bg-primary rounded-lg overflow-hidden">
          <button 
            className="w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Add to wishlist"
          >
            <Heart className="w-4 h-4 text-primary-foreground" />
          </button>
          <button 
            onClick={() => removeItem(item.id)}
            className="w-9 h-9 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4 text-primary-foreground" />
          </button>
        </div>
        <span className="text-lg font-medium">{item.quantity}x</span>
      </div>
    </div>
  );
};

export default CartItemCard;