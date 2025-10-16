import { NextPage } from "next";
import { ICctvListView } from "@/resources/interfaces/cctv//cctvList.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Breadcrumbs, Card, CardContent, Link } from "@mui/material";
import { RouteCctvDetail } from "@/config/routing";

const CctvListView: NextPage<ICctvListView> = ({
  doSave, setState, state, refs, router
}) => {
  return <>
    <ContainerAdmin
      headerTitle="CCTV List"
    >
      <MetaTag
        title="CCTV - Cctv List"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">CctvList</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          {state?.cctvs.map((cctv) => (
            <Card
              key={cctv.id + cctv.name}
              variant="outlined"
              sx={{ mb: 2, cursor: 'pointer', display: 'inline-block', mr: 2, p: 2 }}
              onClick={() => router.push(RouteCctvDetail(cctv.id?.toString(), cctv.cctvCategoryId?.toString()))}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1, alignContent: 'center', flexDirection: "column" }}>
                <img src={"/cctv-seeklogo.png"} alt={cctv.name} style={{ width: '100px', height: 'auto' }} />
                {cctv.name}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CctvListView;