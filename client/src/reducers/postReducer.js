const initState = {
  posts: [],
  post: [],
  loading: false
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_POST":
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: true
      };
    case "GET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case "GET_POST":
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case "DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false
      };
    case "POST_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default postReducer;
