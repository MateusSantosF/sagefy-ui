"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { env } from "@/configs/env";
import { decodeJwt } from "../utils/decode-jwt";
import { TToken } from "../interfaces/TToken";
import { TUser } from "../interfaces/TUser";

type TAuthProps = {
  children: ReactNode;
};

export type TAuthUser = TUser;

type SignoutOptions = {
  redirect?: boolean;
};

type TAuthContextProps = {
  user: TAuthUser | null;
  signout: (options?: SignoutOptions) => void;
  setUserByCookies: () => void;
};

const AuthContext = createContext<TAuthContextProps | null>(null);

export const AuthProvider = ({ children }: TAuthProps) => {
  const [user, setUser] = useState<TAuthUser | null>(null);

  const { push } = useRouter();

  useEffect(() => {
    try {
      const document = typeof window !== "undefined" ? window.document : null;
      const cookies = document?.cookie.split(";");

      const cookie = cookies?.find((cookie) =>
        cookie.includes(env.api.access_token)
      );

      if (!cookie) return;

      const cookieData = cookie.split("=")[1];

      const { sub, name, email, role } = decodeJwt<TToken>(cookieData);

      setUser({
        id: sub,
        name,
        email,
        roles: role,
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const setUserByCookies = useCallback(() => {
    try {
      const document = typeof window !== "undefined" ? window.document : null;
      const cookies = document?.cookie.split(";");

      const cookie = cookies?.find((cookie) =>
        cookie.includes(env.api.access_token)
      );

      if (!cookie) return;

      const cookieData = cookie.split("=")[1];

      const { sub, name, email, role } = decodeJwt<TToken>(cookieData);

      setUser({
        id: sub,
        name,
        email,
        roles: role,
      });
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signout = useCallback(
    async (options: SignoutOptions = { redirect: true }) => {
      try {
        await axios.post("/api/auth/signout");
        setUser(null);
        if (options && options.redirect) {
          push("/");
          location.reload();
        }
      } catch (err: unknown) {
        console.error(err);
      }
    },
    [push]
  );

  return (
    <AuthContext.Provider value={{ user, signout, setUserByCookies }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (ctx == null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return ctx;
};
