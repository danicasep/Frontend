import { setLink } from "@/core/helper/general";

export const RouteHome = () => setLink("/", { view: "home" });
export const RouteCctvList = (category_id: string) => setLink("/", { view: "cctv-list", category_id });
export const RouteCctvDetail = (id: string, category_id: string) => setLink("/", { view: "cctv-detail", id, category_id });