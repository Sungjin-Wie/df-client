import { createContext } from 'react';

export const Context = createContext();

export const initialState = {
  home: {
    server: 'all',
    name: '',
  },
  search: {
    isLoaded: false,
    data: [],
    page: 1,
    pageSize: 9,
  },
  info: {
    isLoaded: false,
  },
};

export const RESET = 'reset';
export const HOME = 'home';
export const SEARCH = 'search';
export const INFO = 'info';

export const reducer = (state, action) => {
  let newState;
  const { type, payload } = action;
  const { name, value } = payload;
  switch (type) {
    case RESET:
      return initialState;
    case HOME:
    case SEARCH:
      newState = {
        ...state,
        [type]: { ...state[type], [name]: value },
      };
      return newState;
    case INFO:
      return {
        ...state,
        [type]: { ...state[type], ...value },
      };
    default:
      return new Error(`Error: action [ ${type}${state} ]`);
  }
};
