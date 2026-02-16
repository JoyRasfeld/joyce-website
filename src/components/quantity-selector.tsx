'use client';

import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  value: number;
  onChange: (qty: number) => void;
}

const options = [
  { quantity: 1, label: '1 magnet', price: '$8.50' },
  { quantity: 4, label: '4 magnets', price: '$25.00' },
];

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {options.map(option => (
        <button
          key={option.quantity}
          type="button"
          onClick={() => onChange(option.quantity)}
          className={cn(
            'rounded-lg border-2 p-4 text-center transition-colors',
            value === option.quantity
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          )}
        >
          <p className="font-semibold">{option.label}</p>
          <p className="text-lg font-bold text-primary">{option.price}</p>
        </button>
      ))}
    </div>
  );
}
