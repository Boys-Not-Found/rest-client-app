import { useVariablesStore } from '@/store/useVariablesStore';

export function applyVariables(input: string) {
  const { variables } = useVariablesStore.getState();

  let result = input;

  variables.forEach(({ key, value }) => {
    const reg = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(reg, value);
  });
  return result;
}
