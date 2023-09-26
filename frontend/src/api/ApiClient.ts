import { API_BASE_URL, ACCESS_TOKEN } from '@/constants';
import Cookies from "js-cookie";
import { ApiResponse } from "@/api/types/ApiResponse";
import { Book } from "@/types/book";

function getToken(): string {
  return Cookies.get(ACCESS_TOKEN) || "";
}

export function setToken(token: string) {
  Cookies.set(ACCESS_TOKEN, token);
}

export function clearToken() {
  Cookies.remove(ACCESS_TOKEN);
}

function ensureToken() {
  if (!getToken()) {
    throw new Error("No access token set.");
  }
}

const request = (options: any) => {
  try {
    ensureToken();
  } catch (error) {
    return Promise.reject((error as Error).message);
  }

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
  return request({
    url: `${API_BASE_URL}/user`,
    method: 'GET'
  });
}

export function getBookList(): Promise<ApiResponse<Book[]>> {
  return request({
    url: `${API_BASE_URL}/books/`,
    method: 'GET',
  });
}

export function createBook({name, description}: {name: string, description: string}): Promise<ApiResponse<Book>> {
  return request({
    url: `${API_BASE_URL}/books/create`,
    method: 'PUT',
    body: JSON.stringify({name: name, description: description}),
  });
}

export function getBook(id: number): Promise<ApiResponse<Book>> {
  return request({
    url: `${API_BASE_URL}/books/${id}`,
    method: 'GET',
  });
}

export function updateBook({id, name, description}: {id: number, name: string, description: string}): Promise<ApiResponse<Book>> {
  return request({
    url: `${API_BASE_URL}/books/update`,
    method: 'PATCH',
    body: JSON.stringify({id: id, name: name, description: description}),
  });
}

export function deleteBook(id: number): Promise<ApiResponse<void>> {
  return request({
    url: `${API_BASE_URL}/books/delete/${id}`,
    method: 'DELETE',
  });
}