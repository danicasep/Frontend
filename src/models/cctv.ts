import { CctvCategory } from "./cctvCategory";

export interface Cctv {
  id?: number;
  name?: string;
  description?: string;
  cctvCategoryId?: number;
  category?: CctvCategory;
  latitude?: string;
  longitude?: string;
  createdAt?: string;
  updatedAt?: string;
}