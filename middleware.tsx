import { NextRequest, NextResponse } from "next/server";
import { MIDDLEWARE_CONFIG } from "@/config/config";
import { Auth } from "@/core/auth";
// import { serverRoutes } from "@/server/web";

export function middleware(req: NextRequest) {
  const middlewareConfig = MIDDLEWARE_CONFIG();

  const isAny = (param: string): boolean => param == "{any}";

  const isNumber = (param: string, value: string): boolean => param == "{number}" && !isNaN(Number(value));

  const checkMultipleGuard = (guards: string[]): boolean => {
    let isFind = false;
    guards.forEach( guard => {
      if(Auth(guard, req).check()) {
        isFind = true;
        return;
      }
    });
    return isFind;
  }

  const isPathNameMatch = (route: string, pathName: string) : boolean => {

    const splitPathName = pathName.split("/");
    const splitLocation = route.split("/");
    
    let isFind = true;

    for(let i = 0; i < splitPathName.length; i++) {
      const pathName = splitPathName[i];
      const location = splitLocation[i];
      
      // location bernilai 'undefined' apabila value dari splitLocation[i] itu out of bound
      if(typeof location != 'undefined' && (
        pathName == location ||
          isAny(pathName) ||
          isNumber(pathName, location)
      )) continue;

      // jika location bernilai 'undefined' maka looping akan diakhiri
      isFind = false;
      break;
    }

    return isFind;
  }

  let isRedirectMiddleware: boolean = false;
  let redirectMiddleware: string = "";

  let isRedirectExcept: boolean =  false;
  let redirectExcept: string = "";

  // for(var key in serverRoutes) {
  //   if(isPathNameMatch(key, req.nextUrl.pathname) ) {
  //     const route: (req: NextRequest) => void = serverRoutes[key];
  //     return route(req);
  //   }
  // }

  middlewareConfig.middleware.forEach( config => {

    config.group.forEach( url => {
      if(
        isPathNameMatch(`${config.prefixRoute}${url}`, req.nextUrl.pathname) &&
        ( 
          checkMultipleGuard(config?.guardNames ?? middlewareConfig.guards) == false || 
          typeof req.cookies.get(middlewareConfig.defaultGuard) === 'undefined'
        )
      ) {
        isRedirectMiddleware = true;
        return;
      }
    });

    if(isRedirectMiddleware) {
      redirectMiddleware = config.redirectUnauthenticed;
      return;
    }
  });

  if(isRedirectMiddleware) return NextResponse.redirect(new URL(redirectMiddleware, req.url));

  for(let i in middlewareConfig.except) {

    const config = middlewareConfig.except[i];

    if(!config?.redirectAuthenticed) continue;

    const auth = req.cookies.get(config?.guardName ?? middlewareConfig.defaultGuard);

    config.routes.forEach( url => {
      if(
        isPathNameMatch(url, req.nextUrl.pathname) &&
        (
          checkMultipleGuard(middlewareConfig?.guards ?? middlewareConfig.guards) == true || 
          typeof auth !== 'undefined'
        )
      ) {
        isRedirectExcept = true;
        return;
      }
    });

    if(isRedirectExcept) {
      redirectExcept = config.redirectAuthenticed;
      break;
    }
  }
  
  if(isRedirectExcept) return NextResponse.redirect(new URL(redirectExcept, req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
      '/((?!_next/static|favicon.ico).*)',
  ]
}