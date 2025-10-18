import { setLink } from "@/core/helper/general";

export const RouteLogin = () => setLink("/login", );
export const RouteHome = () => setLink("/", );
export const RouteCctvCategories = (unit_id: any) => setLink("/", { view: "cctv-unit", unit_id });
export const RouteCctvList = (category_id: string) => setLink("/", { view: "cctv-list", category_id });
export const RouteCctvDetail = (id: string, category_id: string) => setLink("/", { view: "cctv-detail", id, category_id });

// ADMIN
export const RouteAdminCctvUnitService = (service_id: any) => setLink("/", { category_view: "unit", service_id });
export const RouteAdminCctvCategory = () => setLink("/", { category_view: "list" });
export const RouteAdminCctvCategoryForm = (id?: any) => setLink("/", { category_view: "form", ...(id ? { id } : {}) });
export const RouteAdminCctv = () => setLink("/", { cctv_view: "list" });
export const RouteAdminCctvForm = (id?: any) => setLink("/", { cctv_view: "form", ...(id ? { id } : {}) });