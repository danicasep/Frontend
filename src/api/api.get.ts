import { BaseUrlHelper, IBaseUrlHelper } from "@/core/helper/base-url-helper";
import { apiGet } from "./api.container";
import { MIDDLEWARE_CONFIG } from "@/config/config";

export const getCategories = async () => apiGet(`/v1/cctv/categories`, null, {});
export const getCctvs = async (categoryId: any) => apiGet(`/v1/cctv/list/${categoryId}`, null, {});
export const getCctv = async (cctvId: any) => apiGet(`/v1/cctv/detail/${cctvId}`, null, {});

export const getAdminCategories = async (token?: any, queryParams?: {}) => apiGet(`/v1/user/cctv/categories`, token, queryParams);
export const getAdminCategory = async (id: any, token: any) => apiGet(`/v1/user/cctv/categories/${id}`, token, {});

export const getAdminCctvs = async (token?: any, queryParams?: {}) => apiGet(`/v1/user/cctv`, token, queryParams);
export const getAdminCctv = async (id: any, token: any) => apiGet(`/v1/user/cctv/${id}`, token, {});

export const restartAllCctvs = async (token: any) => apiGet(`/v1/user/cctv/camera/restart-all`, token, {});