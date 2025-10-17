import { apiPost, apiPut } from "./api.container";

// export const putData = async () => apiPut(null,`your-url`, null, {});
export const putCategory = async (id: any, form: any, token: any) => apiPost(form,`/v1/user/cctv/categories/form/${id}`, token, {});
export const putCctv = async (id: any, form: any, token: any) => apiPost(form,`/v1/user/cctv/form/${id}`, token, {});
export const putCctvStatus = async (id: any, token: any) => apiPut(null,`/v1/user/cctv/${id}`, token, {});