const reducer = (
  state = {
    selectedform: null,
    selectedsubmission: null,
    submissionmeta: null
  },
  action
) => {
  if (action.type === "selectformviewmode") {
    return { ...state, selectedform: action.payload };
  }
  if (action.type === "selectsubmissionviewmode") {
    return {
      ...state,
      selectedsubmission: action.payload.id,
      selectedsubmissionversion: action.payload.version
    };
  }
  if (action.type === "syncsubmissionmeta") {
    return { ...state, submissionmeta: action.payload };
  }
  return state;
};

export default reducer;
