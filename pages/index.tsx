import { RouterPage } from "@/core/components/router-page";
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
  </>
}