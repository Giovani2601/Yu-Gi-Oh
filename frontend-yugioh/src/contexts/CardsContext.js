import React, { createContext, useReducer, useEffect } from 'react';
import { fetchAllCards } from '../cardService';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

function cardsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const CardsContext = createContext(initialState);

export function CardsProvider({ children }) {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'FETCH_INIT' });
    fetchAllCards()
      .then(cards => {
        dispatch({ type: 'FETCH_SUCCESS', payload: cards });
      })
      .catch(err => {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      });
  }, []);

  return (
    <CardsContext.Provider value={state}>
      {children}
    </CardsContext.Provider>
  );
}
