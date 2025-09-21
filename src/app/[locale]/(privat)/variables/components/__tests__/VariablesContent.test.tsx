import { screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import VariablesContent from '../VariablesContent';
import * as variablesStore from '@/store/useVariablesStore';
import { renderWithIntl } from '@/test-utils/renderWithIntl';

vi.mock('react-hot-toast');

describe('VariablesContent', () => {
  const addVariableMock = vi.fn();
  const removeVariableMock = vi.fn();
  const clearVariablesMock = vi.fn();

  beforeEach(() => {
    vi.spyOn(variablesStore, 'useVariablesStore').mockImplementation((selector) =>
      selector({
        variables: [],
        addVariable: addVariableMock,
        removeVariable: removeVariableMock,
        clearVariables: clearVariablesMock,
      })
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders title and inputs', () => {
    renderWithIntl(<VariablesContent />, 'en');

    expect(screen.getByText('Variables')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('key')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('value')).toBeInTheDocument();
    expect(screen.getByText('Clear all variables')).toBeInTheDocument();
  });

  it('calls addVariable when adding a new variable', () => {
    renderWithIntl(<VariablesContent />, 'en');

    const keyInput = screen.getByPlaceholderText('key') as HTMLInputElement;
    const valueInput = screen.getByPlaceholderText('value') as HTMLInputElement;
    const addButton = screen.getByTestId('add');

    keyInput.value = 'testKey';
    valueInput.value = 'testValue';
    fireEvent.click(addButton);

    expect(addVariableMock).toHaveBeenCalledWith('testKey', 'testValue');
    expect(keyInput.value).toBe('');
    expect(valueInput.value).toBe('');
  });

  it('calls removeVariable when delete button is clicked', () => {
    vi.spyOn(variablesStore, 'useVariablesStore').mockImplementation((selector) =>
      selector({
        variables: [{ key: 'k', value: 'v' }],
        addVariable: addVariableMock,
        removeVariable: removeVariableMock,
        clearVariables: clearVariablesMock,
      })
    );

    renderWithIntl(<VariablesContent />, 'en');

    const deleteButton = screen.getByTestId('delete-k');
    fireEvent.click(deleteButton);

    expect(removeVariableMock).toHaveBeenCalledWith('k');
  });

  it('calls clearVariables when clear button is clicked', () => {
    renderWithIntl(<VariablesContent />, 'en');

    const clearButton = screen.getByText('Clear all variables');
    fireEvent.click(clearButton);

    expect(clearVariablesMock).toHaveBeenCalled();
  });
});
