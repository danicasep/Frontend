import { ServiceUnit } from "./serviceUnit";

export interface CctvCategory {
  id?: number;
  name?: string;
  serviceUnitId?: number;
  service_unit?: ServiceUnit;
  createdAt?: string;
  updatedAt?: string;
}