// scr/components/admin/forms/ProductDynamicItem.tsx
import { X } from 'lucide-react';

interface ProductDynamicItemProps {
  item: string;
  onRemove: () => void;
  onChange: (newItem: string) => void;
}

export default function ProductDynamicItem({
  item,
  onRemove,
  onChange
}: ProductDynamicItemProps) {
  return (
    <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg">
      <input
        type="text"
        value={item}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-black/50 border border-orange-500/20 rounded-lg text-white"
        placeholder="Add feature or requirement"
      />
      <button
        type="button"
        onClick={onRemove}
        className="text-red-400 hover:text-red-300"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
