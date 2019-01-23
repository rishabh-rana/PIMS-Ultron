const reducer = (
  state = {
    user:
      localStorage.getItem("user") === "null" ||
      localStorage.getItem("user") === null
        ? null
        : { email: localStorage.getItem("user") }
  },
  action
) => {
  if (action.type === "syncusers") {
    console.log(action.payload);
    action.payload
      ? localStorage.setItem("user", action.payload.email)
      : localStorage.setItem("user", null);
    return { ...state, user: action.payload };
  }
  return state;
};

export default reducer;
