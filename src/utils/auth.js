export const BASE_URL = "https://auth.nomoreparties.co";

export const login = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((response) => {
      try {
        if (response.status === 200) {
          return response.json();
        }
      } catch (e) {}
    })
    .then((res) => {
      localStorage.setItem("token", res.token);
      return res;
    });
};

export const register = (password, email) => {

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((response) => {
      if (response.status === 201) {
        return response.json();
      }
  })
};

export const getMe = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    });
  } else {
    return Promise.resolve();
  }
};
