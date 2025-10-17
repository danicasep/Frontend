import { apiDelete } from "./api.container";

export const deleteCctvCategory = async (categoryId: any, token: any) => apiDelete(null,`/v1/user/cctv/categories/${categoryId}`, token, {});
export const deleteCctv = async (cctvId: any, token: any) => apiDelete(null,`/v1/user/cctv/${cctvId}`, token, {});