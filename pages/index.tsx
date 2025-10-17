import { RouterPage } from "@/core/components/router-page";
import CategoryCctvPage from "@/resources/pages/cctv/admin/categoryCctv.page";
import CategoryFormPage from "@/resources/pages/cctv/admin/categoryForm.page";
import CctvFormPage from "@/resources/pages/cctv/admin/cctvForm.page";
import CctvPagePage from "@/resources/pages/cctv/admin/cctvPage.page";
import CctvDetailPage from "@/resources/pages/cctv/cctvDetail.page";
import CctvListPage from "@/resources/pages/cctv/cctvList.page";
import HomePage from "@/resources/pages/home.page";

export default function page() {
  return <>
    <RouterPage
      pathName="/"
      isWithoutQuery={true}
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      onUpdate={(isActive) => <HomePage />}
    />
    <RouterPage
      pathName="/"
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      where={{
        category_id: "{any}",
        view: "cctv-list"
      }}
      onUpdate={(isActive) => <CctvListPage />}
    />
    <RouterPage
      pathName="/"
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      where={{
        id: "{any}",
        category_id: "{any}",
        view: "cctv-detail"
      }}
      onUpdate={(isActive) => <CctvDetailPage />}
    />

    {/* ADMIN */}
    <RouterPage
      pathName="/"
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      where={{
        category_view: "list"
      }}
      onUpdate={(isActive) => <CategoryCctvPage />}
    />
    <RouterPage
      pathName="/"
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      where={{
        category_view: "form", 
        id: "{any}"
      }}
      orWhere={{
        category_view: "form"
      }}
      onUpdate={(isActive) => <CategoryFormPage />}
    />
    <RouterPage
      pathName="/"
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      where={{
        cctv_view: "list"
      }}
      onUpdate={(isActive) => <CctvPagePage />}
    />
    <RouterPage
      pathName="/"
      removeWhenInactive={true}
      removeWhenQueryNotMatches={true}
      where={{
        cctv_view: "form",
        id: "{any}"
      }}
      orWhere={{
        cctv_view: "form"
      }}
      onUpdate={(isActive) => <CctvFormPage />}
    />
  </>
}