const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
