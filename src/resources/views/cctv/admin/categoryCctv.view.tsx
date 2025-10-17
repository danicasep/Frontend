import { NextPage } from "next";
import { ICategoryCctvView } from "@/resources/interfaces/cctv/admin//categoryCctv.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Breadcrumbs, Button, Card, CardContent, Link } from "@mui/material";
import CustomTable from "@/components/custom/table.custom";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add
} from '@mui/icons-material';
import { RouteAdminCctvCategoryForm } from "@/config/routing";
import CustomConfirm from "@/components/custom/confirm.custom";

const CategoryCctvView: NextPage<ICategoryCctvView> = ({
  doSave, setState, state, refs, router, doDelete
}) => {
  return <>
    <ContainerAdmin
      headerTitle="Kategori CCTV"
    >
      <MetaTag
        title="CCTV - Kategori CCTV"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">List  Kategori</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          <h1>Kategori CCTV</h1>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            onClick={(e) => {
              router.push(RouteAdminCctvCategoryForm());
            }}
            startIcon={<Add />}>
            Tambah Kategori
          </Button>
          <CustomTable
            columns={[
              { id: "no", label: "No" },
              { id: "name", label: "Nama" },
              { id: "createdAt", label: "Dibuat Pada" },
              { id: "updatedAt", label: "Diperbarui Pada" },
            ]}
            actions={[
              {
                icon: <EditIcon />,
                label: 'Edit',
                color: 'primary',
                onClick: (row) => {
                  router.push(RouteAdminCctvCategoryForm(row.id));
                }
              },
              {
                icon: <DeleteIcon />,
                label: 'Delete',
                color: 'error',
                onClick: (row) => {
                  setState({
                    openConfirmModal: true,
                    selectedCategory: row
                  });
                }
              }
            ]}
            data={state?.categories?.map((cat, index) => ({
              ...cat,
              no: index + 1,
              createdAt: new Date(cat.createdAt || "").toLocaleString(),
              updatedAt: new Date(cat.updatedAt || "").toLocaleString(),
            })) || []}
            loading={state?.loading}
          />
          <CustomConfirm
            open={state?.openConfirmModal || false}
            onClose={() => setState({ openConfirmModal: false })}
            onConfirm={() => {
              doDelete(state?.selectedCategory?.id);
            }}
            title="Hapus Kategori"
            variant="delete"
            message={`Apakah anda yakin ingin menghapus Kategori CCTV bernama ${state?.selectedCategory?.name}?`}
          />
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CategoryCctvView;