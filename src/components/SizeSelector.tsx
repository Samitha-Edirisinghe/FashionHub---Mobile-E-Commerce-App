import { Size } from '@/types';

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
}

const SizeSelector = ({ sizes, selectedSize, onSelect }: SizeSelectorProps) => {
  return (
    <div className="flex items-center gap-3">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSelect(size)}
          className={`size-chip ${
            selectedSize === size ? 'size-chip-active' : 'size-chip-inactive'
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
