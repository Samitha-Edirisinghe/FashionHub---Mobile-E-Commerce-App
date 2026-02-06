import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';
import { createOrder, processPayment } from '@/services/api';
import PageHeader from '@/components/PageHeader';

const paymentMethods = [
  { id: 'visa', name: 'VISA', className: 'text-blue-800 font-bold italic' },
  { id: 'amex', name: 'AMERICAN\nEXPRESS', className: 'text-blue-600 text-[8px] font-bold leading-tight' },
  { id: 'mastercard', name: '●●', className: 'text-red-500 font-bold text-lg' },
  { id: 'paypal', name: 'PayPal', className: 'text-blue-700 font-bold italic text-xs' },
  { id: 'apple', name: '⌘Pay', className: 'text-foreground font-medium text-xs' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, delivery, total, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('visa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handlePayment = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);
    try {
      const order = await createOrder();
      setOrderId(order.id);
      
      const result = await processPayment(order.id);
      
      if (result.success) {
        clearCart();
        toast.success('Payment successful!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !orderId) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Checkout" />
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <p className="text-muted-foreground">Your cart is empty</p>
          <button 
            onClick={() => navigate('/home')}
            className="btn-primary mt-4"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Checkout" />

      <div className="px-4 space-y-6">
        {/* Delivery Address */}
        <section>
          <h3 className="text-sm font-medium text-primary mb-3">Delivery Address</h3>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
              <img 
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/91.87,24.9,12,0/48x48?access_token=placeholder" 
                alt="Map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = '<div class="w-full h-full bg-green-100 flex items-center justify-center"><span class="text-green-600 text-xs">🗺️</span></div>';
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">25/3 Housing Estate,</p>
              <p className="text-muted-foreground">Sylhet</p>
            </div>
            <button className="text-primary text-sm font-medium">
              Change
            </button>
          </div>
          
          <div className="flex items-center gap-2 mt-3 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Delivered in next 7 days</span>
          </div>
        </section>

        {/* Payment Method */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Payment Method</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`min-w-[56px] h-10 px-3 rounded-lg border transition-all flex-shrink-0 flex items-center justify-center ${
                  selectedPayment === method.id 
                    ? 'border-primary' 
                    : 'border-border'
                }`}
              >
                <span className={method.className} style={{ whiteSpace: 'pre-line' }}>{method.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Add Voucher */}
        <button className="w-full py-4 border border-border rounded-xl text-center text-muted-foreground hover:bg-secondary transition-colors">
          Add Voucher
        </button>

        {/* Order Note */}
        <div className="rounded-xl">
          <p className="text-sm leading-relaxed">
            <span className="text-primary font-medium">Note</span>{' '}
            <span className="text-muted-foreground">
              : Use your order id at the payment. Your Id{' '}
              <span className="text-primary font-semibold">{orderId || '#154619'}</span>{' '}
              if you forget to put your order id we can't confirm the payment.
            </span>
          </p>
        </div>

        {/* Order Summary */}
        <div className="space-y-3 pt-2">
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

        {/* Pay Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="btn-primary w-48 disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;