import { API_BASE_URL, ACCESS_TOKEN } from '@/constants';
import Cookies from "js-cookie";

function getToken(): string {
  return Cookies.get(ACCESS_TOKEN) || "";
}

export function setToken(token: string) {
  Cookies.set(ACCESS_TOKEN, token);
}

export function clearToken() {
  Cookies.remove(ACCESS_TOKEN);
}

const request = (options: any) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  if (getToken()) {
    headers.append('Authorization', 'Bearer ' + getToken())
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
    .then(response =>
      response.json().then(json => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
    );
}

export function getCurrentUser() {
  if (!getToken()) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user",
    method: 'GET'
  });
}
