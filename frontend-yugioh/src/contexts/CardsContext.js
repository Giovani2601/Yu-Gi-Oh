import React, { createContext, useReducer, useEffect } from 'react';
import { fetchAllCards, fetchCardsByName } from '../cardService';

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
      return { 
        ...state, 
        loading: false, 
        data: action.payload,
        error: action.payload.length === 0 ? 'Nenhuma carta encontrada' : null
      };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export const CardsContext = createContext(initialState);

export function CardsProvider({ children }) {
  const [state, dispatch] = useReducer(cardsReducer, initialState);

  const fetchAll = async () => {
    dispatch({ type: 'FETCH_INIT' });
    try {
      const cards = await fetchAllCards();
      dispatch({ type: 'FETCH_SUCCESS', payload: cards });
    } catch (err) {
      dispatch({ type: 'FETCH_FAILURE', payload: err.message });
    }
  };

  const searchCards = async (name) => {
  if (!name.trim()) return;
  
  dispatch({ type: 'FETCH_INIT' });
  try {
    const cards = await fetchCardsByName(name);
    dispatch({
      type: 'FETCH_SUCCESS',
      payload: cards,
      error: cards.length === 0 ? 'Nenhuma carta encontrada' : null
    });
  } catch (err) {
    dispatch({ type: 'FETCH_FAILURE', payload: err.message });
  }
};

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <CardsContext.Provider value={{ ...state, searchCards, fetchAll }}>
      {children}
    </CardsContext.Provider>
  );
}
