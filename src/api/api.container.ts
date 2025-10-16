import { MIDDLEWARE_CONFIG } from "@/config/config";
import { BaseUrlHelper, IBaseUrlHelper } from "@/core/helper/base-url-helper";
import axios from "axios";
import { Auth } from "src/core/auth";

const apiBase = async (dataParams: any, url: string, method: "POST" | "GET" | "PUT" | "DELETE", token?: string): Promise<any | null> => {

  const baseUrlHelper = new BaseUrlHelper();

  const baseUrl = baseUrlHelper.get() == IBaseUrlHelper.production ? process.env.NEXT_PUBLIC_API_URL : process.env.NEXT_PUBLIC_API_URL_DEV;
  
  const { status, data } = await axios({
    method: method,
    url: baseUrl + url,
    data: dataParams,
    headers: {
      ...(token && { 'X-Access-Token': `${token}` }),
      ...(method == "POST" && {'Content-Type': 'multipart/form-data'}),
      "x-token": MIDDLEWARE_CONFIG().PUBLIC_TOKEN
    }
  });

  return `${status}`.startsWith('20') ? data : null;
};

export interface IResponse {
  record: any,
  realResponse: any,
  error?: null | {
    title: string,
    message: string,
    errors: any
  }
}

const getData = (realResponse?: any, data?: any,  error?: any) : IResponse => {
  
  if(error == null) return {
    record: data,
    realResponse: realResponse,
    error: null
  }

  const message = error?.response?.data?.message;
  const errors = error?.response?.data?.errors;

  if(typeof message === 'string' && message?.toString()?.toLowerCase()?.indexOf("unauthenticated") != -1) {
    Auth().logout();
    window.location.replace("/");
  }

  return {
    record: null,
    realResponse: realResponse,
    error: {
      title: "Ops, terjadi kesalahan!",
      message: message,
      errors: errors
    }
  };
}

const apiWrapper = async (params: any, url: string, method: "POST" | "GET" | "DELETE" | "PUT", token?: string, queryParams ?: {}) : Promise<IResponse> => {
  let result = null;
  try {
    let queryParamsURL = "";
    if(JSON.stringify(queryParams) != "{}") {
      queryParamsURL = "?" + new URLSearchParams(queryParams).toString();
    }
    result = await apiBase(params, url + queryParamsURL, method, token);
    
    return getData( result, result.record, result ? result.errors : null)

  } catch (err) {
    return getData(result, null, err);
  }
}

const apiPost = async(params: any, url: string, token?: string, queryParams?: {}): Promise<IResponse> => apiWrapper(params, url, "POST",token, queryParams);
const apiGet = async(url: string, token?: string, queryParams?: {}): Promise<IResponse> => apiWrapper(null, url, "GET",token, queryParams);
const apiDelete = async(params: any, url: string, token?: string, queryParams?: {}): Promise<IResponse> => apiWrapper(params, url, "DELETE",token, queryParams);
const apiPut = async(params: any, url: string, token?: string, queryParams?: {}): Promise<IResponse> => apiWrapper(params, url, "PUT",token, queryParams);

export {
  apiPost,
  apiGet,
  apiDelete,
  apiPut
}