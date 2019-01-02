const reducer = (state = { error: null }, action) => {
  if (action.type === "seterrordisplay") {
    return { ...state, error: action.payload };
  }
  return state;
};

export default reducer;
