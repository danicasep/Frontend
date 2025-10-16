import { apiPost } from "./api.container";

export const postLogin = async (form: any) => apiPost(form,`/login`, null, {});

export const postOutlet = async (form: any, token: any) => apiPost(form,`/outlet/form`, token, {});

export const postMachine = async (form: any, token: any) => apiPost(form,`/iot/machine/form`, token, {});

export const postService = async (form: any, token: any) => apiPost(form,`/iot/service/form`, token, {});

export const postProfile = async (form: any, token: any) => apiPost(form,`/user/profile`, token, {});
export const postProfileChangePassword = async (form: any, token: any) => apiPost(form,`/user/profile/change-password`, token, {});

export const postWithdraw = async (form: any, token: any) => apiPost(form,`/point/withdraw`, token, {});

export const postUserManagement = async (form: any, token: any) => apiPost(form,`/user-management`, token, {});

export const postWinpayRequest = async (form: any, token: any) => apiPost(form,`/winpay/requests`, token, {});