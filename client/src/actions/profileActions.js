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

export const addExperience = (exp, history) => dispatch => {
  axios
    .get("/api/profile/experience", exp)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};
export const addEducation = (edu, history) => dispatch => {
  axios
    .get("/api/profile/education", edu)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Are you sure you want to delete your account? This action can NOT be undone!"
    )
  ) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: "SET_CURRENT_USER",
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        })
      );
  }
};
