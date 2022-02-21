import { USER_LOGIN, USER_LOGOUT } from "../actionTypes";

export const userLogin = (payload) => {
  return async (dispatch) => {
    return await fetch('https://hacktiv8-instafood.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then((result) => dispatch(loginUser(result.access_token)))
      .catch((err) => console.log(err))
  }
}

export const loginUser = (access_token) => {
  return {
    type: USER_LOGIN,
    payload: access_token,
  }
}

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  }
}

export const userRegister = (payload) => {
  return async (dispatch) => {
    return await fetch('https://hacktiv8-instafood.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject('something went wrong!');
        }
      })
      .then((result) => dispatch(loginUser(result.access_token)))
      .catch((err) => console.log(err))
  }
}
