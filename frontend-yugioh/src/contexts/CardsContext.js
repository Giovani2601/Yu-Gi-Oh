import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { fetchAllCardTypes, fetchCardsByFilters } from '../cardService';

const initialState = {
  data: [],
  loading: false,
  error: null,
  types: [],      
  currentType: '',
  currentName: '',
};

function cardsReducer(state, action) {
  switch (action.type) {
    case 'SET_TYPES':
      return { ...state, types: action.payload };
    case 'SET_TYPE':
      return { ...state, currentType: action.payload };
    case 'SET_NAME':
      return { ...state, currentName: action.payload };
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: action.payload.length === 0 ? 'Nenhuma carta encontrada' : null,
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
  const abortRef = useRef();

  const loadTypes = async () => {
    try {
      const types = await fetchAllCardTypes();
      dispatch({ type: 'SET_TYPES', payload: types });
    } catch (err) {
      console.error('Erro ao carregar tipos:', err);
    }
  };

  const fetchFiltered = async (type, name) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    dispatch({ type: 'FETCH_INIT' });
    try {
      const cards = await fetchCardsByFilters({ type, name }, ac.signal);
      dispatch({ type: 'FETCH_SUCCESS', payload: cards });
    } catch (err) {
      if (err.name !== 'AbortError') {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      }
    }
  };

  const fetchAll = () => {
    dispatch({ type: 'SET_TYPE', payload: '' });
    dispatch({ type: 'SET_NAME', payload: '' });
    fetchFiltered('', '');
  };

  const searchCards = (name) => {
    dispatch({ type: 'SET_NAME', payload: name });
    fetchFiltered(state.currentType, name);
  };

  const fetchByType = (type) => {
    dispatch({ type: 'SET_TYPE', payload: type });
    fetchFiltered(type, state.currentName);
  };

  useEffect(() => {
    fetchAll();
    loadTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardsContext.Provider
      value={{
        ...state,
        fetchAll,
        searchCards,
        fetchByType,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
}
