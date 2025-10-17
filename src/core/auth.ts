import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextRequest } from 'next/server';
import { MIDDLEWARE_CONFIG } from "@/config/config";

interface IAuth {
  data?: any;
  token?: string;
}

export const Auth = (guard?: string, request?: NextRequest) => {

  const config = MIDDLEWARE_CONFIG();

  const guardName = guard ?? config.defaultGuard;

  const expiredName = `${guardName}-expired`;

  if (config.guards.indexOf(guardName)) throw Error(`${guardName} doesn't exist!`);

  const set = (data: any, isForever?: boolean) => {
    if (request) {
      request.cookies.set({ name: guardName, value: data });
      return;
    }

    let maxAge = config.expired;
    if (isForever) {
      let ages = new Date();
      const firstTime = ages.getTime();

      ages.setFullYear(ages.getFullYear() + 10);

      const lastTime = ages.getTime();

      maxAge = (lastTime - firstTime) / 1000;
    }

    setCookie(
      expiredName,
      maxAge,
      {
        path: "/",
        maxAge: maxAge,
        sameSite: true,
      });

    setCookie(
      guardName,
      data,
      {
        path: "/",
        maxAge: maxAge,
        sameSite: true,
      });
    return;
  }

  const check = (): boolean => {
    try {
      const json = JSON.parse(request ? request.cookies.get(guardName).value : getCookie(guardName).toString());
      return json ? true : false;
    } catch (_) {
      return false;
    }
  }

  const update = (data: any) => {
    if (request) {
      request.cookies.set({ name: guardName, value: data });
      return;
    }
    try {
      const maxAgeCookie = getCookie(expiredName);
  
      setCookie(
        guardName,
        data,
        {
          path: "/",
          maxAge: parseInt(maxAgeCookie),
          sameSite: true,
        });
    } catch (_) {
    }
  }

  const get = (): IAuth => {
    try {
      return JSON.parse(request ? request.cookies.get(guardName).value : getCookie(guardName).toString());
    } catch (_) {
      return null;
    }
  }

  const logout = () => {

    if (request) request.cookies.delete(guardName);

    deleteCookie(guardName);
  }

  return {
    set,
    check,
    get,
    logout,
    update
  }
}