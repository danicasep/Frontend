import { apiPost, apiPut } from "./api.container";

// export const putData = async () => apiPut(null,`your-url`, null, {});
export const putOutlet = async (outletId:any, form: any, token: any) => apiPost(form,`/outlet/form/${outletId}`, token, {});

export const putUserManagement = async (userId:any, form: any, token: any) => apiPost(form,`/user-management/${userId}`, token, {});

export const putMachine = async (machineId:any, form: any, token: any) => apiPost(form,`/iot/machine/form/${machineId}`, token, {});

export const putService = async (serviceId:any, form: any, token: any) => apiPost(form,`/iot/service/form/${serviceId}`, token, {});