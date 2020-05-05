import { createContext } from 'react';

export const Context = createContext();

export const initialState = {
  home: {
    value: '',
    server: 'all',
  },
  search: {
    isLoaded: false,
    data: [],
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
      console.log(newState);
      return newState;
    default:
      return new Error(`Error: action [ ${action.type} ]`);
  }
};
