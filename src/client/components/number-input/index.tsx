'use client';

import type { TextFieldProps } from '@mui/material';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/client/hook/useDebounce';
import { formatInputNumber } from '@/core/utils/number-format';

type NumberInputProps = {
  value?: number | null;
  onChange: (value: number) => void;
  delay?: number;
} & Omit<TextFieldProps, 'value' | 'onChange'>;

export const parseNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '' || value === 0) return null;
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? null : parsed;
};

export const NumberInput: React.FC<NumberInputProps> = ({ value, onChange, delay = 500, ...textFieldProps }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const debouncedValue = useDebounce(displayValue, delay);

  // Initialize display value when component mounts or value changes externally
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(value ? formatInputNumber(value) : '');
    }
  }, [value, isFocused]);

  // Update actual field value when debounced (only when user is typing)
  useEffect(() => {
    if (isFocused && debouncedValue !== '') {
      const cleanValue = debouncedValue.replace(/,/g, '');
      const numValue = parseFloat(cleanValue) || 0;
      onChange(numValue);
    }
  }, [debouncedValue, onChange, isFocused]);

  return (
    <TextField
      {...textFieldProps}
      value={displayValue}
      onChange={(e) => {
        setDisplayValue(e.target.value);
      }}
      onFocus={() => {
        setIsFocused(true);
        // Clear formatting when focusing for easier editing
        const cleanValue = displayValue.replace(/,/g, '');
        setDisplayValue(cleanValue);
      }}
      onBlur={() => {
        setIsFocused(false);
        // Format and update on blur
        const cleanValue = displayValue.replace(/,/g, '');
        const numValue = parseFloat(cleanValue) || 0;
        onChange(numValue);
        setDisplayValue(formatInputNumber(numValue));
      }}
      size='small'
    />
  );
};
