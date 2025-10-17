import { NextPage } from "next";
import { IHomeView } from "@/resources/interfaces//home.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Breadcrumbs, Card, CardContent, Link } from "@mui/material";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { RouteCctvList } from "@/config/routing";
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
          {state?.categories.map((category) => (
            <Card
              key={category.id + category.name}
              variant="outlined"
              sx={{ mb: 2, cursor: 'pointer', display: 'inline-block', mr: 2, p: 2 }}
              onClick={() => router.push(RouteCctvList(category.id?.toString()))}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1, alignContent: 'center', flexDirection: "column" }}>
                <OndemandVideoIcon sx={{ fontSize: 40 }} />
                {category.name}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default HomeView;