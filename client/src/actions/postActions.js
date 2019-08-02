import axios from "axios";

export const addPost = post => dispatch => {
  dispatch(clearErrors());
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
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: "DELETE_POST",
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: "GET_POSTS",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_POSTS",
        payload: null
      })
    );
};
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: "GET_POST",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_POST",
        payload: null
      })
    );
};
export const setPostLoading = () => {
  return {
    type: "POST_LOADING"
  };
};

export const addComment = (id, comment) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${id}`, comment)
    .then(res =>
      dispatch({
        type: "GET_POST",
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
export const deleteComment = (id, cid) => dispatch => {
  axios
    .delete(`/api/posts/comment/${id}/${cid}`)
    .then(res =>
      dispatch({
        type: "GET_POST",
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

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  };
};
