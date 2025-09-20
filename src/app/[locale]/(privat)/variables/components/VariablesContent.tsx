'use client';
import { useVariablesStore } from '@/store/useVariablesStore';
import { useTranslations } from 'next-intl';
import { useDeferredValue, useRef } from 'react';
import toast from 'react-hot-toast';
import { LuDelete } from 'react-icons/lu';
import { MdOutlinePlaylistAdd } from 'react-icons/md';

export default function VariablesContent() {
  const t = useTranslations('vars');
  const variables = useVariablesStore((state) => state.variables);
  const addVariable = useVariablesStore((state) => state.addVariable);
  const removeVariable = useVariablesStore((state) => state.removeVariable);
  const clearVariables = useVariablesStore((state) => state.clearVariables);

  const deferredVariables = useDeferredValue(variables);

  const keyRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (keyRef.current && valueRef.current) {
      const key = keyRef.current.value.trim();
      const value = valueRef.current.value.trim();

      if (!key) return;

      const exists = variables.some((v) => v.key === key);
      if (exists) {
        keyRef.current.value = '';
        valueRef.current.value = '';
        toast.error(t('exists'));
        return;
      }
      addVariable(key, value);

      keyRef.current.value = '';
      valueRef.current.value = '';
    }
  };

  const handleClear = () => {
    clearVariables();
    toast.success(t('cleared'));
  };

  const handleDelete = (key: string) => {
    removeVariable(key);
    toast.success(t('deleted'));
  };
  return (
    <>
      <h1>{t('title')}</h1>
      {deferredVariables &&
        deferredVariables.map((v) => (
          <div key={v.key} className="flex justify-between input px-3 py-1">
            <p>{`{{${v.key}}}`}</p>
            <p>{v.value}</p>
            <button
              className="btn-icon text-2xl"
              data-testid={`delete-${v.key}`}
              onClick={() => handleDelete(v.key)}
            >
              <LuDelete />
            </button>
          </div>
        ))}
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
        <div className="flex justify-between gap-4 items-end">
          <input ref={keyRef} type="text" placeholder="key" className="input" name="key" />
          <input ref={valueRef} type="text" placeholder="value" className="input" name="value" />
          <button className="btn-icon text-3xl" onClick={handleAdd} data-testid="add">
            <MdOutlinePlaylistAdd />
          </button>
        </div>
        <div className="flex justify-end gap-4">
          <button className="btn inverted" onClick={handleClear}>
            {t('clear')}
          </button>
        </div>
      </form>
    </>
  );
}
