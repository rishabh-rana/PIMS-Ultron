const reducer = (
  state = { selectedform: null, renderformvalues: null, currentsubids: null },
  action
) => {
  if (action.type === "selectformsubmitmode") {
    return { ...state, selectedform: action.payload, renderformvalues: null };
  }
  if (action.type === "submitformdatavaluesupdate") {
    return { ...state, renderformvalues: action.payload };
  }
  if (action.type === "synccurrentsubids") {
    return { ...state, currentsubids: action.payload };
  }
  return state;
};

export default reducer;
