export const BASE_URL = "http://127.0.0.1:8000"
import { cookies } from 'next/headers'
// export const BASE_URL = "http"


export function fetchApi(url:string, options:object = {}, ...args) {
  return fetch(`${BASE_URL}/${url}`, {
    ...options,
    cache: options.cache || 'force-cache'
  }, ...args)
}

export async function  fetchApiAuth(url:string, data = {}) {
    const kukies = await cookies()
    return fetchApi(url, {
        cache: 'no-cache',
        ...data,
        headers: {
          'Cookie': kukies.getAll().map((cookie) => `${cookie.name}=${cookie.value}`).join('; '),
          ...data.headers
        }
    })
}

export async function getProfile() {
  const data = await fetchApiAuth('users/profile/', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
  }).catch(_ => {
      return null
  });

  if (data == null || data.status !== 200) {
      return null
  }

  const json = await data.json();
  return json;
}