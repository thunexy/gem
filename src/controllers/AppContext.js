import React, {createContext} from 'react';

const useController = () => {
  const initialState = {
    countries: [],
    states: [],
    steps: {},
    account: {},
    fundRequests: [],
  };

  const [state, dispatch] = React.useReducer(
    (state, value) => ({
      ...state,
      ...value,
    }),
    initialState,
  );

  return {state, dispatch};
};

export const AppContext = createContext({});

export default useController;
