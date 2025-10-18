import { apiGet } from "./api.container";

export const getCategories = async (unitId: any) => apiGet(`/v1/cctv/categories/${unitId}`, null, {});
export const getCctvs = async (categoryId: any) => apiGet(`/v1/cctv/list/${categoryId}`, null, {});
export const getCctv = async (cctvId: any) => apiGet(`/v1/cctv/${cctvId}`, null, {});

export const getAdminCategories = async (token?: any, queryParams?: {}) => apiGet(`/v1/user/cctv/categories`, token, queryParams);
export const getAdminCategory = async (id: any, token: any) => apiGet(`/v1/user/cctv/categories/${id}`, token, {});

export const getAdminCctvs = async (token?: any, queryParams?: {}) => apiGet(`/v1/user/cctv`, token, queryParams);
export const getAdminCctv = async (id: any, token: any) => apiGet(`/v1/user/cctv/${id}`, token, {});

export const getServiceUnits = async (token?: any) => apiGet(`/v1/user/cctv/units`, token, {});

export const restartAllCctvs = async (token: any) => apiGet(`/v1/user/cctv/camera/restart-all`, token, {});