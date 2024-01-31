import { JwtPayload, jwtDecode } from 'jwt-decode';
import { AuthToken } from '@/types/auth';
import { API_ENDPOINT } from '@/config/endpoints';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config/common';
import { eraseCookie, getCookie, setCookie } from '@/utils/cookie';

type JwtCallback = (error?: any, data?: AuthToken) => void;

const callbacks: Record<string, JwtCallback[]> = {};
const isRefreshed: Record<string, boolean> = {};

const doRefresh = async (refreshToken: string, cb: JwtCallback) => {
  const list = callbacks[refreshToken] || [];
  list.push(cb);
  callbacks[refreshToken] = list;
  if (callbacks[refreshToken]?.length === 1) {
    try {
      if (isRefreshed[refreshToken]) {
        return;
      }

      const response = await fetch(`${API_ENDPOINT}/auth/refresh/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${refreshToken}` },
      });
      const body = await response.json();
      if (response.status === 401) {
        callbacks[refreshToken].forEach((callback) => {
          callback({ ...body }, undefined);
        });
      } else {
        isRefreshed[refreshToken] = true;

        const data = body.data;
        const jwt: AuthToken = {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        callbacks[refreshToken].forEach((callback) => {
          callback(undefined, jwt);
        });
      }
    } catch (error) {
      console.log(error);
      callbacks[refreshToken].forEach((callback) => {
        callback(`Error: ${error}`, undefined);
      });
    }

    delete callbacks[refreshToken];
  }
};

export const isValidJwt = (accessToken: string): boolean => {
  try {
    const payload = jwtDecode(accessToken) as JwtPayload;
    if (payload.exp) {
      return payload.exp - Date.now() / 1000 > 300; // refresh token if nearly expire (300s) or expired
    }
    return true;
  } catch (error) {
    return true;
  }
};

export const refreshJwt = async (refreshToken: string): Promise<AuthToken> => {
  return new Promise((resolve, reject) => {
    doRefresh(refreshToken, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data!);
      }
    });
  });
};

export const setJwt = (accessToken: string, refreshToken: string) => {
  setCookie(ACCESS_TOKEN_KEY, accessToken);
  setCookie(REFRESH_TOKEN_KEY, refreshToken);
};

export const getJwt = (type: 'accessToken' | 'refreshToken') => {
  return type === 'accessToken' ? getCookie(ACCESS_TOKEN_KEY) : getCookie(REFRESH_TOKEN_KEY);
};

export const removeJwt = () => {
  eraseCookie(ACCESS_TOKEN_KEY);
  eraseCookie(REFRESH_TOKEN_KEY);
};
