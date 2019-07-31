import isEmpty from "../validation/is-empty";

const initState = {
  isAuth: false,
  user: {}
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuth: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
