import { useCallback, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

const createClipping = (value: string): Clipping => {
  return {
    id: uuid(),
    value,
  };
};

const clippingReducer = (clippings: Clipping[], action: ClippingAction) => {
  switch (action.type) {
    case 'remove':
      return clippings.filter((c) => c.id !== action.id);
    case 'add':
      return [createClipping(action.value), ...clippings];
    case 'update':
      return clippings.map((c) =>
        c.id === action.id ? { ...c, value: action.value } : c,
      );
  }
};

export const useClippings = (initialClippings: Clipping[] = []) => {
  const [clippings, dispatch] = useReducer(clippingReducer, initialClippings);

  const addClipping = useCallback(
    (value: Clipping['value']) => {
      const clipping = createClipping(value);
      return dispatch({ type: 'add', value: clipping.value });
    },
    [dispatch],
  );

  const removeClipping = useCallback(
    (id: string) => dispatch({ type: 'remove', id }),
    [dispatch],
  );

  const updateClipping = useCallback(
    (id: string, value: string) => dispatch({ type: 'update', id, value }),
    [dispatch],
  );

  return {
    clippings,
    addClipping,
    removeClipping,
    updateClipping,
  } as const;
};
