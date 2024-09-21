'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

type DropdownProps = {
  value?: string | number;
  onChangeHandler: (value: string | number) => void;
  type:
    | 'category'
    | 'position'
    | 'priority'
    | 'speed'
    | 'aspect ratio'
    | 'image size'; // Added type prop to differentiate between categories and positions
};

const categories = [
  { id: 'fashion', name: 'Fashion' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'luxury', name: 'Luxury' },
];

const positions = [
  { id: 'start', name: 'Start' },
  { id: 'center', name: 'Center' },
  { id: 'end', name: 'End' },
];

const priorityOptions = [
  { id: 'yes', name: 'Yes' },
  { id: 'no', name: 'No' },
];

const speedOptions = Array.from({ length: 9 }, (_, i) => {
  const value = i - 4; // Generates values from -4 to 4
  return { id: value.toString(), name: value.toString() };
});

const aspectRatioOptions = [
  { id: '16/9', name: '16:9' },
  { id: '9/16', name: '9:16' },
];

const imageSizeOptions = [
  { id: 'petite', name: 'petite' },
  { id: 'moyenne', name: 'moyenne' },
  { id: 'grande', name: 'grande' },
];

const Dropdown = ({ value, onChangeHandler, type }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(value?.toString() || '');

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  const handleChange = (value: string) => {
    const parsedValue = type === 'speed' ? parseInt(value) : value; // Parse back to number if type is speed
    setSelectedValue(value);
    onChangeHandler(parsedValue);
  };

  let items = categories;
  if (type === 'position') items = positions;
  if (type === 'priority') items = priorityOptions;
  if (type === 'speed') items = speedOptions;
  if (type === 'aspect ratio') items = aspectRatioOptions;
  if (type === 'image size') items = imageSizeOptions;

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder={`Choose ${type}`} />
      </SelectTrigger>
      <SelectContent className="shad-select-content capitalize">
        {items.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="flex cursor-pointer items-center gap-2"
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
