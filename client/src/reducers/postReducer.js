const initState = {
  posts: [],
  post: [],
  loading: false
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "PROFILE_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default postReducer;
