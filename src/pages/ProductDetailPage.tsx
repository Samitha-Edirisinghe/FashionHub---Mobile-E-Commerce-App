import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Product, Size, ProductColor } from '@/types';
import { getProduct } from '@/services/api';
import { useCart } from '@/context/CartContext';
import PageHeader from '@/components/PageHeader';
import SizeSelector from '@/components/SizeSelector';
import ColorSwatches from '@/components/ColorSwatches';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      try {
        const data = await getProduct(id);
        if (data) {
          setProduct(data);
          setSelectedSize(data.sizes[2] || data.sizes[0]); // Default to L or first
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Failed to load product:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }

    setIsAdding(true);
    try {
      await addItem(product.id, selectedSize, selectedColor);
      toast.success('Added to cart!');
      navigate('/cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title="Details" showBookmark />
        <div className="px-4 animate-pulse">
          <div className="aspect-[4/5] bg-secondary rounded-2xl" />
          <div className="mt-6 h-8 bg-secondary rounded w-48" />
          <div className="mt-4 h-4 bg-secondary rounded w-32" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      <PageHeader title="Details" showBookmark />
      
      {/* Product Image */}
      <div className="px-4 mb-6">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover animate-scale-in"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 animate-slide-up">
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>
          <ColorSwatches
            colors={product.colors}
            selectedColor={selectedColor}
            onSelect={setSelectedColor}
          />
        </div>

        {/* Size Selector */}
        <div className="mt-6">
          <h3 className="text-base font-semibold text-foreground mb-3">Size</h3>
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-8">
          <p className="text-2xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="btn-primary disabled:opacity-50"
          >
            {isAdding ? 'Adding...' : 'Add To Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
