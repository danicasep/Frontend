import { BaseUrlHelper, IBaseUrlHelper } from "@/core/helper/base-url-helper";
import { apiGet } from "./api.container";
import { MIDDLEWARE_CONFIG } from "@/config/config";

export const getCategories = async () => apiGet(`/v1/cctv/categories`, null, {});
export const getCctvs = async (categoryId: any) => apiGet(`/v1/cctv/list/${categoryId}`, null, {});
export const getCctv = async (cctvId: any) => apiGet(`/v1/cctv/detail/${cctvId}`, null, {});