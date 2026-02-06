import { Category } from '@/types';

interface CategoryFilterProps {
  categories: { id: Category; label: string }[];
  activeCategory: Category;
  onSelect: (category: Category) => void;
}

const CategoryFilter = ({ categories, activeCategory, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`category-pill whitespace-nowrap ${
            activeCategory === category.id 
              ? 'category-pill-active' 
              : 'category-pill-inactive'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
