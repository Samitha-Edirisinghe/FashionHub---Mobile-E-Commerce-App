import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import PageHeader from '@/components/PageHeader';
import CartItemCard from '@/components/CartItemCard';
import BottomNav from '@/components/BottomNav';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, delivery, total, isLoading } = useCart();

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="page-container">
      <PageHeader title="Cart" />

      <div className="px-4">
        <h1 className="text-2xl font-bold text-foreground mb-4">My Orders</h1>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex gap-4 py-4 animate-pulse">
                <div className="w-20 h-20 bg-secondary rounded-xl" />
                <div className="flex-1">
                  <div className="h-5 bg-secondary rounded w-32 mb-2" />
                  <div className="h-4 bg-secondary rounded w-20 mb-1" />
                  <div className="h-5 bg-secondary rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Your cart is empty</p>
            <button 
              onClick={() => navigate('/home')}
              className="btn-primary mt-4"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-border">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Total Items ({items.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Standard Delivery</span>
                <span>${delivery.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground font-semibold text-lg pt-2 border-t border-border">
                <span>Total Payment</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCheckout}
                className="btn-primary w-48"
              >
                Checkout Now
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default CartPage;
