import { createContext } from 'react';

export const Context = createContext();

export const initialState = {
  home: {
    server: 'all',
    name: '',
  },
  search: {
    isLoaded: false,
    isEmpty: true,
    data: [],
    page: 1,
    pageSize: 9,
  },
  info: {
    isLoaded: false,
    data: {
      characterId: '',
    },
  },
  search: {
    value: '',
    isLoaded: false,
    data: {},
  },
  loading: false,
};
export const LOADING = 'loading';
export const RESET = 'reset';
export const HOME = 'home';
export const HOME_INIT = 'homeInit';
export const SEARCH = 'search';
export const SEARCH_INIT = 'searchInit';
export const SEARCH_FETCH_START = 'searchFetchStart';
export const SEARCH_FETCH_SUCCESS = 'searchFetchSuccess';
export const SEARCH_FETCH_FAILED = 'searchFetchFailed';
export const INFO = 'info';
export const INFO_INIT = 'infoInit';
export const INFO_FETCH_START = 'infoFetchStart';
export const INFO_FETCH_SUCCESS = 'infoFetchSuccess';
export const INFO_FETCH_FAILED = 'infoFetchFailed';
export const AUCTION = 'auction';
export const AUCTION_INIT = 'auctionInit';
export const AUCTION_FETCH_START = 'auctionFetchStart';
export const AUCTION_FETCH_SUCCESS = 'auctionFetchSuccess';
export const AUCTION_FETCH_FAILED = 'auctionFetchFailed';

export const reducer = (state, action) => {
  const { home, info, search } = state;
  const { type } = action;
  switch (type) {
    case RESET:
      return initialState;
    case HOME_INIT:
      return { ...state, home: initialState.home };
    case SEARCH_INIT:
      return { ...state, search: initialState.search };
    case INFO_INIT:
      return { ...state, info: initialState.info };
    case HOME:
    case SEARCH:
    case INFO:
    case AUCTION: {
      const { name, value } = action.payload;
      return {
        ...state,
        [type]: {
          ...state[type],
          [name]: value,
        },
      };
    }
    case SEARCH_FETCH_START:
    case INFO_FETCH_START:
    case AUCTION_FETCH_START:
      return { ...state, search: initialState[type], loading: true };
    case SEARCH_FETCH_SUCCESS:
      return {
        ...state,
        search: {
          ...search,
          isLoaded: true,
          isEmpty: action.payload.value.length === 0 ? true : false,
          data: action.payload.value,
        },
        loading: false,
      };
    case INFO_FETCH_SUCCESS:
      return {
        ...state,
        info: { isLoaded: true, data: action.payload.value },
        loading: false,
      };
    case SEARCH_FETCH_FAILED:
      console.log(SEARCH_FETCH_FAILED);
      return {
        ...state,
        search: {
          ...search,
          isLoaded: true,
          isEmpty: false,
          data: [],
        },
        loading: false,
      };
    case INFO_FETCH_FAILED:
      console.log(INFO_FETCH_FAILED);
      return { ...state, info: initialState.info, loading: false };
    default:
      return new Error(`Error: action [ ${type}${state} ]`);
  }
};
