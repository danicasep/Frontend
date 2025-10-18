import { NextPage } from "next";
import { IHomeView } from "@/resources/interfaces//home.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Breadcrumbs, Card, CardContent, Link } from "@mui/material";
import CustomLoading from "@/components/custom/loading.custom";
const HomeView: NextPage<IHomeView> = ({
  doSave, setState, state, refs, router
}) => {
  return <>
    <ContainerAdmin
      headerTitle="CCTV - Home"
    >
      <MetaTag
        title="CCTV - Home"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">Home</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CustomLoading isLoading={state?.loading} variant="dots"/>
        <CardContent>
          <img src="/1_1.png" alt="Description" style={{width: "100%"}} />
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default HomeView;