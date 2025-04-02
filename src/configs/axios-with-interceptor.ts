"use client";

import axios, { AxiosInstance } from "axios";
import { env } from "./env";
import { decodeJwt } from "@shared/utils/decode-jwt";
import { TToken } from "@shared/interfaces/TToken";
import { parseCookies } from "nookies";

export const axiosInstance = axios.create({ baseURL: env.api.base_url });

const isTokenExpired = (jwtExp: number): boolean => {
  return jwtExp ? Date.now() > jwtExp * 1000 : false;
};

// Adiciona o interceptor de rotação de token
export const setRefreshTokenInterceptor = (axios: AxiosInstance) => {
  axios.interceptors.request.use(async (config) => {
    const isServerSide = typeof window === "undefined";
    if (isServerSide) return config;

    const parsedCookies = parseCookies();
    const accessToken = parsedCookies[env.api.access_token];
    const refreshToken = parsedCookies[env.api.refresh_token];

    if (accessToken) {
      const decodedToken = decodeJwt<TToken>(accessToken);
      if (isTokenExpired(decodedToken.exp) && refreshToken) {
        try {
          const response = await axios.post("/refresh-token", { refreshToken });
          const { accessToken: newAccessToken } = response.data;
          config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        } catch {
          return Promise.reject(new Error("Falha na renovação do token"));
        }
      } else {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const parsedCookies = parseCookies();
        const refreshToken = parsedCookies[env.api.refresh_token];

        if (refreshToken) {
          try {
            const response = await axios.post("/refresh-token", {
              refreshToken,
            });
            const { accessToken: newAccessToken } = response.data;

            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          } catch {
            // Redirecionar para login ou tratar erro conforme necessário
            return Promise.reject(new Error("Falha na renovação do token"));
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return axios;
};

export const axiosWithInterceptor = setRefreshTokenInterceptor(axiosInstance);
