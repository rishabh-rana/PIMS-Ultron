const reducer = (state = { user: null }, action) => {
  if (action.type === "syncusers") {
    console.log(action.payload);
    return { ...state, user: action.payload };
  }
  return state;
};

export default reducer;
