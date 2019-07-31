import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//register
export const register = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

//login
export const login = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: "SET_CURRENT_USER",
    payload: decoded
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
