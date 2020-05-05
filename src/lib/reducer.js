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

export const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'reset':
      return initialState;
    case 'home':
    case 'search':
      newState = {
        ...state,
        [action.type]: { ...state[action.type], [action.state]: action.value },
      };
      return newState;
    case 'info':
      return {
        ...state,
        [action.type]: { ...state[action.type], ...action.value },
      };
    default:
      return new Error(`Error: action [ ${action.type}${action.state} ]`);
  }
};
