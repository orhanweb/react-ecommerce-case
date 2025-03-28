// src/components/CategorySelector/index.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from '@/components/ui/select';
import { Category } from '@/types';

type Props = {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
};

const CategorySelector = ({ categories, selectedCategory, onCategoryChange }: Props) => {
  return (
    <Select value={selectedCategory} onValueChange={onCategoryChange}>
      <SelectTrigger>
        <SelectValue placeholder="Kategori Seçin" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {categories.map(category => (
            <SelectItem key={category.originalName} value={category.originalName}>
              {category.displayName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
