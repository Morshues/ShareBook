import { API_BASE_URL, ACCESS_TOKEN } from '@/constants';
import Cookies from "js-cookie";
import { ApiResponse } from "@/api/types/ApiResponse";
import { CreateAccountBookItem } from "@/api/types/BookItem";
import { AccountBook } from "@/types/accountBook";
import { AccountBookItem } from "@/types/AccountBookItem";

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

export function getAccountBookList(): Promise<ApiResponse<AccountBook[]>> {
  return request({
    url: `${API_BASE_URL}/acctBooks/`,
    method: 'GET',
  });
}

export function createAccountBook({name, description}: {name: string, description: string}): Promise<ApiResponse<AccountBook>> {
  return request({
    url: `${API_BASE_URL}/acctBooks/create`,
    method: 'PUT',
    body: JSON.stringify({name: name, description: description}),
  });
}

export function getAccountBook(id: number): Promise<ApiResponse<AccountBook>> {
  return request({
    url: `${API_BASE_URL}/acctBooks/${id}`,
    method: 'GET',
  });
}

export function updateAccountBook({id, name, description}: {id: number, name: string, description: string}): Promise<ApiResponse<AccountBook>> {
  return request({
    url: `${API_BASE_URL}/acctBooks/update`,
    method: 'PATCH',
    body: JSON.stringify({id: id, name: name, description: description}),
  });
}

export function deleteAccountBook(id: number): Promise<ApiResponse<void>> {
  return request({
    url: `${API_BASE_URL}/acctBooks/delete/${id}`,
    method: 'DELETE',
  });
}

export function createAccountBookItem(item: CreateAccountBookItem): Promise<ApiResponse<AccountBookItem>> {
  return request({
    url: `${API_BASE_URL}/acctBookItems/create`,
    method: 'PUT',
    body: JSON.stringify(item),
  });
}