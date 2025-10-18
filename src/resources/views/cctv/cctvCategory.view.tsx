import { NextPage } from "next";
import { ICctvCategoryView } from "@/resources/interfaces/cctv//cctvCategory.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Breadcrumbs, Card, CardContent, Link } from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { RouteCctvList } from "@/config/routing";
import CustomLoading from "@/components/custom/loading.custom";
import { isView } from "@/config/view";

const CctvCategoryView: NextPage<ICctvCategoryView> = ({
  doSave, setState, state, refs, router
}) => {
  const isMobile = isView("mobile");
  return <>
    <ContainerAdmin
      headerTitle="Header CCTV"
    >
      <MetaTag
        title="CCTV - Cctv Category"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">CCTV Kategori</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          {state?.categories.map((category) => (
            <Card
              key={category.id + category.name}
              variant="outlined"
              sx={{ mb: 2, cursor: 'pointer', display: 'inline-block', mr: 2, p: 2, width: isMobile ? "100%" : "auto",  }}
              onClick={() => router.push(RouteCctvList(category.id?.toString()))}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1, alignContent: 'center', flexDirection: "column" }}>
                <OndemandVideoIcon sx={{ fontSize: 40 }} />
                {category.name}
              </CardContent>
            </Card>
          ))}
          <CustomLoading isLoading={state?.loading} variant="dots" />
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CctvCategoryView;