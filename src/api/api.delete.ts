import { apiDelete } from "./api.container";

export const deleteOutlet = async (outletId: any, token: any) => apiDelete(null,`/outlet/delete/${outletId}`, token, {});
export const deleteUserManagement = async (userId: any, token: any) => apiDelete(null,`/user-management/${userId}`, token, {});
export const deleteMachine = async (machineId: any, token: any) => apiDelete(null,`/iot/machine/delete/${machineId}`, token, {});
export const deleteService = async (serviceId: any, token: any) => apiDelete(null,`/iot/service/delete/${serviceId}`, token, {});