export const BASE_URL = 'https://api.nomoreparties.co';

const request = ({
  url,
  method = 'POST',
  token,
  data
}) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...!!token && { 'Authorization': `Bearer ${token}` }
    },
    ...!!data && { body: JSON.stringify(data) }
  })
  .then((res) => {
    if (!res.ok) return Promise.reject(res.status);

    return res.json();
  });
}

export const register = (username, password, email) => {
  return request({
    url: '/auth/local/register',
    data: {username, password, email}
  });
};

export const authorize = (identifier, password) => {
  return request({
    url: '/auth/local',
    data: {identifier, password}
  });
};

export const getContent = (token) => {
  return request({
    url: '/users/me',
    method: 'GET',
    token
  });
}


