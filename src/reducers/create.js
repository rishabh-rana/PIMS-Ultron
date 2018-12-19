const reducer = (state = { forms: null, selectedform: null }, action) => {
  if (action.type === "syncforms") {
    return { ...state, forms: action.payload };
  }

  if (action.type === "selectformcreatemode") {
    return { ...state, selectedform: action.payload };
  }

  return state;
};

export default reducer;
