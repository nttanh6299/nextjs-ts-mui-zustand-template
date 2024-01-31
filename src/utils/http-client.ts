import axios, { AxiosRequestConfig } from 'axios';
import Router from 'next/router';
import { API_ENDPOINT } from '@/config/endpoints';
import { getJwt, isValidJwt, refreshJwt, removeJwt, setJwt } from '@/utils/jwt';
import { REDIRECT_AUTH_KEY } from '@/config/common';
import { PATHS } from '@/config/paths';
import { QUERY_SEPARATOR } from '@/constants/common';
import { URLUtils } from '@/utils/url';

const loginPath = PATHS.login.url().toString();

const getRedirectUrl = () => {
  if (typeof window !== 'undefined') {
    const urlUtils = new URLUtils(window.location.pathname, QUERY_SEPARATOR);
    return urlUtils.serializeRedirectUrl();
  }
  return '';
};

export type { AxiosResponse } from 'axios';

export const Axios = axios.create({
  timeout: 50000,
  baseURL: API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
Axios.interceptors.request.use(
  async function rel(config) {
    try {
      if (config?.headers?.basic) {
        return config;
      }

      const accessToken = getJwt('accessToken');
      let newJwt = {
        accessToken: accessToken || '',
        refreshToken: '',
      };
      if (accessToken) {
        const isValid = isValidJwt(accessToken);
        if (!isValid) {
          const refreshToken = getJwt('refreshToken') as string;
          newJwt = await refreshJwt(refreshToken);
          if (newJwt) {
            setJwt(newJwt.accessToken, newJwt.refreshToken);
          }
        }
      }
      const token = newJwt?.accessToken;
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log('Axios error:', error);
      removeJwt();
      if (typeof window !== 'undefined' && window.location.pathname !== loginPath) {
        Router.push(`${loginPath}?${REDIRECT_AUTH_KEY}=${getRedirectUrl()}`);
      }

      return Promise.reject(error);
    }

    return config;
  },
  function rej(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
Axios.interceptors.response.use(
  function rel(response) {
    return response;
  },
  function rej(error) {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      removeJwt();
      if (typeof window !== 'undefined' && window.location.pathname !== loginPath) {
        Router.push(`${loginPath}?${REDIRECT_AUTH_KEY}=${getRedirectUrl()}`);
      }
    }

    if (error.response) {
      return Promise.reject(error.response);
    }
    if (error.request) {
      return Promise.reject(error.request);
    }
    return Promise.reject(error.message);
  },
);

export interface ResponseType<Data> {
  status?: number;
  message?: string;
  messageTranslated?: string;
  data: Data;
}

export class HttpClient {
  static async get<Res, Options = unknown>(url: string, config?: AxiosRequestConfig<Options>) {
    const response = await Axios.get<Res>(url, config);
    return response.data;
  }

  static async post<Res, Data = unknown, Options = unknown>(
    url: string,
    data: Data,
    options?: AxiosRequestConfig<Options>,
  ) {
    const response = await Axios.post<Res>(url, data, options);
    return response.data;
  }

  static async put<Res, Data = unknown, Options = unknown>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig<Options>,
  ) {
    const response = await Axios.put<Res>(url, data, config);
    return response.data;
  }

  static async patch<Res, Data = unknown, Options = unknown>(
    url: string,
    data: Data,
    config?: AxiosRequestConfig<Options>,
  ) {
    const response = await Axios.patch<Res>(url, data, config);
    return response.data;
  }

  static async delete<Res, Options = unknown>(url: string, options?: AxiosRequestConfig<Options>) {
    const response = await Axios.delete<Res>(url, options);
    return response.data;
  }
}
