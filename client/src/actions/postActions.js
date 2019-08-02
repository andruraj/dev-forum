import axios from "axios";

export const addPost = post => dispatch => {
  axios
    .post("/api/posts", post)
    .then(res =>
      dispatch({
        type: "ADD_POST",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
