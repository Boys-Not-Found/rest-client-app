'use client';
import { useVariablesStore } from '@/store/variablesStore';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function VariablesContent() {
  const t = useTranslations('vars');
  const variables = useVariablesStore((state) => state.variables);
  const addVariable = useVariablesStore((state) => state.addVariable);
  // const removeVariable = useVariablesStore((state) => state.removeVariable);
  const clearVariables = useVariablesStore((state) => state.clearVariables);

  const keyRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (keyRef.current && valueRef.current) {
      addVariable(keyRef.current.value, valueRef.current.value);
    }
  };

  return (
    <>
      <h1>{t('title')}</h1>
      {variables &&
        variables.map((v) => (
          <div key={v.key} className="flex justify-between">
            <p>{v.key}</p>
            <p>{v.value}</p>
          </div>
        ))}
      <form action="" className="flex flex-col gap-4">
        <div className="flex justify-center gap-4">
          <label htmlFor="id">
            {t('key')}
            <input ref={keyRef} type="text" placeholder="key" className="input" id="key" />
          </label>
          <label htmlFor="value">
            {t('value')}
            <input ref={valueRef} type="text" placeholder="value" className="input" id="value" />
          </label>
        </div>
        <div className="flex justify-center gap-4">
          <button className="btn inverted" onClick={handleAdd}>
            {t('add')}
          </button>
          {/* <button className="btn inverted" onClick={() => removeVariable('key')}>
            {t('delete')}
          </button> */}
          <button className="btn inverted" onClick={() => clearVariables()}>
            {t('clear')}
          </button>
        </div>
      </form>
    </>
  );
}
