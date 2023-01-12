export const INITIAL_STATE = {
  passwordLength: 8,
  includeUppercase: false,
  includeNumbers: false,
  includeSymbols: false,
};

export const ACTION = {
  CHANGE_LENGTH: 'changeLength',
  TOGGLE_UPPERCASE: 'toggleUppercase',
  TOGGLE_NUMBERS: 'toggleNumbers',
  TOGGLE_SYMBOLS: 'toggleSymbols',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'changeLength':
      return { ...state, passwordLength: action.payload };
    case 'toggleUppercase':
      return { ...state, includeUppercase: !state.includeUppercase };
    case 'toggleNumbers':
      return { ...state, includeNumbers: !state.includeNumbers };
    case 'toggleSymbols':
      return { ...state, includeSymbols: !state.includeSymbols };
    default:
      break;
  }
};
