import axios from "axios";

export const getCurrentProfile = () => dispatch => {
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: "GET_PROFILE",
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: "GET_PROFILE",
        payload: {}
      })
    );
  dispatch(setProfileLoading());
};

export const setProfileLoading = () => dispatch => {
  return {
    type: "PROFILE_LOADING"
  };
};

export const clearProfile = () => dispatch => {
  return {
    type: "CLEAR_CURRENT_PROFILE"
  };
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
