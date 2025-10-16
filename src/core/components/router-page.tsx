import { useState, useEffect, useRef } from "react";
import { useCustomRouter } from "../helper/general";
import { IRouterPage } from "./interfaces/router-page.interface";
/**
 * 
 * @param res : IRouterPage
 * @returns 
 * 
 * Cara menggunakan component ini:
 * ```javascript
 * <RouterPage
    pathName='/user/list/{any}'
    onUpdate={(isActive) => {
      return <MencobaView isActive={isActive}/>
    }}
  />
 * ```
 * Menggunakan query
 * ```javascript
 * <RouterPage
    pathName='/user/list'
    where={{
      page: "form"
    }}
    orWhere={{
      page: "privilege"
    }}
    onUpdate={(isActive) => {
      return <MencobaView isActive={isActive}/>
    }}
  />
  ```
 */
export const RouterPage = ({ ...res }: IRouterPage) => {
  const router = useCustomRouter();

  const [isActive, setActive] = useState(false);
  const firstRender = useRef(true);

  const isAny = (param: string): boolean => param == "{any}";

  const isNumber = (param: string, value: string): boolean => param == "{number}" && !isNaN(Number(value));

  useEffect(() => {


    const callback = (err:any, url:any) => {

      let isFindQuery = true;
      // Jika attribute where ada
      if(!res.isWithoutQuery) {
        if(res.where != null) isFindQuery = find("where");
  
        // jika attribute orWhere ada
        // dan nilai dari isFindQuery FALSE
        if (isFindQuery == false && res.orWhere != null) isFindQuery = find("orWhere");
      } else {
        isFindQuery = Object.keys(router.query).length == 0;
      }
      
      setActive(isPathNameMatch() && isFindQuery);
    }

    /**
     * 
     * @param attribute 
     * @returns boolean
     * 
     * Parameter attribute digunakan untuk mencari key dari query 'where' atau 'orWhere'
     */
    const find = (attribute: string): boolean => {
      let isFind = false;

      let keys = res[attribute];

      if(res.removeWhenQueryNotMatches) {
        if(Object.keys(router.query).length > Object.keys(res[attribute]).length) keys = router.query;
        else if(Object.keys(res[attribute]).length > Object.keys(router.query).length) keys = res[attribute];
      }
      
      for (var key in keys) {

        const keyExist = router.query[key];
        // mencari persamaan antara value dari attribute (where atau orWhere)
        // dan dari query (router)
        const valueEqual = res[attribute][key] == router.query[key];
        // apakah value dari attribute (where atau orWhere) berisikan {any}
        const isValueUsingAny = isAny(res[attribute][key]);
        // apakah value dari attribute (where atau orWhere) berisikan {number}
        const isValueUsingNumber = isNumber(res[attribute][key], keyExist?.toString());

        if (keyExist && (valueEqual || isValueUsingAny || isValueUsingNumber)) {
          isFind = true;
          continue;
        }

        isFind = false;
        break;
      }
      
      return isFind;
    }

    /**
     * 
     * @returns boolean
     * 
     * Mencocokan per segmen dari Route/URL antara pathName dengan location.pathname
     */
    const isPathNameMatch = () : boolean => {
      const splitPathName = res.pathName.split("/");
      const splitLocation = window.location.pathname.split("/");
      
      let isFind = true;

      for(let i = 0; i < splitPathName.length; i++) {
        const pathName = splitPathName[i];
        const location = splitLocation[i];
        
        // location bernilai 'undefined' apabila value dari splitLocation[i] itu out of bound
        if(typeof location != 'undefined') {
          if(
            pathName == location ||
            isAny(pathName) ||
            isNumber(pathName, location)
          ) continue;
        }

        // jika location bernilai 'undefined' maka looping akan diakhiri
        isFind = false;
        break;
      }

      return isFind;
    }

    // firstRender digunakan untuk memblokir/prevent callback yang akan dieksekusi lebih dari 1x
    // ketika halaman pertama kali diakses
    if (firstRender) {
      callback(null, null);
      firstRender.current = false;
      return;
    }

    router.events.on("routeChangeComplete", callback);
    return (() => {
      router.events.off("routeChangeComplete", callback)
    })
  }, [isActive, router]);

  return <>
    {(res.removeWhenInactive == null || res.removeWhenInactive == false) || isActive ? res.onUpdate(isActive) : null}
  </>
}