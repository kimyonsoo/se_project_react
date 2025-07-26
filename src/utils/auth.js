import { baseUrl } from "./constants";

export const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const register = ({ email, password, name, avatar }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      avatar: avatar,
    }),
  }).then(handleResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        return res;
      }
      return Promise.reject("No token received");
    });
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      return res;
    })
    .then(handleResponse)
    .catch((err) => {
      console.error(err);

      return "Bad request";
    });
};
