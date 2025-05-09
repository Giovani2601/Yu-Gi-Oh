import React, { createContext, useReducer, useEffect, useRef } from 'react';
import { fetchAllCardTypes, fetchCardsByFilters } from '../cardService';

// Define o estado inicial do contexto
const initialState = {
  data: [],
  loading: false,
  error: null,
  types: [],      
  currentType: '',
  currentName: '',
};

// Define o reducer que irá gerenciar o estado do contexto
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

  // Função para carregar todos os tipos de cartas
  const loadTypes = async () => {
    try {
      const types = await fetchAllCardTypes();
      dispatch({ type: 'SET_TYPES', payload: types });
    } catch (err) {
      console.error('Erro ao carregar tipos:', err);
    }
  };

  // Função para buscar cartas filtradas por tipo e nome
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

  // Função para buscar todas as cartas
  const fetchAll = () => {
    dispatch({ type: 'SET_TYPE', payload: '' });
    dispatch({ type: 'SET_NAME', payload: '' });
    fetchFiltered('', '');
  };

  // Função para buscar cartas por nome
  const searchCards = (name) => {
    dispatch({ type: 'SET_NAME', payload: name });
    fetchFiltered(state.currentType, name);
  };

  // Função para buscar cartas por tipo
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
    // O CardsContext.Provider fornece o estado e as funções para os componentes filhos
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
