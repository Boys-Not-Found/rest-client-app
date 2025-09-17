'use client';
import { useState } from 'react';

type HeaderRowProps = {
  id: string;
  keyValue: string;
  value: string;
  onChange: (key: string, value: string) => void;
  onRemove: () => void;
};

export function HeaderRow({ keyValue, value, onChange, onRemove }: HeaderRowProps) {
  const [keyInput, setKeyInput] = useState(keyValue);
  const [valueInput, setValueInput] = useState(value);

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setKeyInput(newKey);
    onChange(newKey, valueInput);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValueInput(newValue);
    onChange(keyInput, newValue);
  };

  return (
    <div className="flex gap-2">
      <input
        value={keyInput}
        onChange={handleKeyChange}
        placeholder="Header key"
        className="input"
      />
      <input
        value={valueInput}
        onChange={handleValueChange}
        placeholder="Header value"
        className="input"
      />
      <button type="button" onClick={onRemove} className="btn-icon">
        ✕
      </button>
    </div>
  );
}
