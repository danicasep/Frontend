import { apiPost } from "./api.container";

export const postLogin = async (form: any) => apiPost(form,`/v1/login`, null, {});

export const postCategory = async (form: any, token: any) => apiPost(form,`/v1/user/cctv/categories/form`, token, {});
export const postCctv = async (form: any, token: any) => apiPost(form,`/v1/user/cctv/form`, token, {});