import { ProductColor } from '@/types';

interface ColorSwatchesProps {
  colors: ProductColor[];
  selectedColor: ProductColor | null;
  onSelect: (color: ProductColor) => void;
}

const ColorSwatches = ({ colors, selectedColor, onSelect }: ColorSwatchesProps) => {
  return (
    <div className="flex items-center gap-2">
      {colors.map((color) => (
        <button
          key={color.id}
          onClick={() => onSelect(color)}
          className={`color-swatch ${
            selectedColor?.id === color.id ? 'color-swatch-active' : ''
          }`}
          style={{ backgroundColor: color.hex }}
          aria-label={`Select ${color.name}`}
          title={color.name}
        />
      ))}
    </div>
  );
};

export default ColorSwatches;
