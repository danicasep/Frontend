import { NextPage } from "next";
import { ICctvPageView } from "@/resources/interfaces/cctv/admin//cctvPage.interface";
import { ContainerAdmin } from "@/components/core/admin/container-admin";
import { MetaTag } from "@/components/core/metatag";
import { Box, Breadcrumbs, Button, Card, CardActions, CardContent, Chip, Link, MenuItem, Select, TextField } from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add,
  Search
} from '@mui/icons-material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CustomTable from "@/components/custom/table.custom";
import CustomConfirm from "@/components/custom/confirm.custom";
import { RouteAdminCctvForm } from "@/config/routing";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { CustomPagination } from "@/components/custom/pagination.custom";

const CctvPageView: NextPage<ICctvPageView> = ({
  doSave, setState, state, refs, router, doDelete, doGet, doUpdateStatus, doRestartCctvs
}) => {
  return <>
    <ContainerAdmin
      headerTitle="Daftar CCTV"
    >
      <MetaTag
        title="CCTV - Daftar CCTV"
      />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">Daftar CCTV</Link>
      </Breadcrumbs>
      <Card variant="outlined">
        <CardContent>
          <h1>Daftar CCTV</h1>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              onClick={(e) => {
                router.push(RouteAdminCctvForm());
              }}
              startIcon={<Add />}>
              Tambah CCTV
            </Button>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="warning"
              onClick={(e) => {
                setState({ openConfirmRestartModal: true });
              }}
              startIcon={<SettingsBackupRestoreIcon />}>
              Restart Semua CCTV
            </Button>
          </Box>
          <Card sx={{ mt: 2, mb: 2 }}>
            <CardContent>
              <Box component="form" onSubmit={doGet} sx={{ flexDirection: "row", alignContent: "center" }}> {/* Add your form submission handler here */}
                <TextField label="Nama CCTV" placeholder="Masukkan nama CCTV" size="small" value={state?.search} onChange={(e) => setState({search: e.target.value})} />
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={state?.selectedCategoryFilter || ''}
                  label="Pilih Kategori"
                  displayEmpty
                  onChange={(e) => {
                    setState({ selectedCategoryFilter: e.target.value ?? ""});
                  }}
                >
                  <MenuItem selected value="">Semua Kategori</MenuItem>
                  {state?.categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
                {/* ... other form fields */}
                <Button type="submit" variant="contained" color="secondary" startIcon={<Search />}>Cari</Button>
              </Box>
            </CardContent>
          </Card>
          <CustomTable
            columns={[
              { id: "no", label: "No" },
              { id: "name", label: "Nama" },
              { id: "isActive", label: "Status" },
              { id: "categoryName", label: "Kategori" },
              { id: "createdAt", label: "Dibuat Pada" },
              { id: "updatedAt", label: "Diperbarui Pada" },
            ]}
            actions={[
              {
                icon: <AutorenewIcon />,
                label: 'Update Status',
                color: 'secondary',
                onClick: (row) => {
                  setState({
                    openConfirmStatusModal: true,
                    selectedCctv: row
                  });
                }
              },
              {
                icon: <EditIcon />,
                label: 'Edit',
                color: 'primary',
                onClick: (row) => {
                  router.push(RouteAdminCctvForm(row.id));
                }
              },
              {
                icon: <DeleteIcon />,
                label: 'Delete',
                color: 'error',
                onClick: (row) => {
                  setState({
                    openConfirmModal: true,
                    selectedCctv: row
                  });
                }
              }
            ]}
            data={state?.cctvs?.map((cctv, index) => ({
              ...cctv,
              no: (state?.page - 1) * state?.perPage + index + 1,
              categoryName: cctv.category?.name || '-',
              isActive: <Chip label={cctv.isActive ? 'Aktif' : 'Tidak Aktif'} color={cctv.isActive ? 'success' : 'default'} />,
              createdAt: new Date(cctv.createdAt || "").toLocaleString(),
              updatedAt: new Date(cctv.updatedAt || "").toLocaleString(),
            })) || []}
            loading={state?.loading}
          />
          <CustomPagination
            sx={{ mt: 2 }}
            currentPage={state?.page}
            perPage={state?.perPage}
            total={state?.totalCctvs}
            onChange={(page) => {
              setState({ page: page, isPaginate: true });
            }}
          />
          <CustomConfirm
            open={state?.openConfirmRestartModal || false}
            onClose={() => setState({ openConfirmRestartModal: false })}
            onConfirm={() => {
              doRestartCctvs();
            }}
            title="Restart Semua CCTV"
            variant="warning"
            message={`Apakah anda yakin ingin merestart semua CCTV?`}
          />
          <CustomConfirm
            open={state?.openConfirmModal || false}
            onClose={() => setState({ openConfirmModal: false })}
            onConfirm={() => {
              doDelete(state?.selectedCctv?.id);
            }}
            title="Hapus CCTV"
            variant="delete"
            message={`Apakah anda yakin ingin menghapus CCTV bernama ${state?.selectedCctv?.name}?`}
          />
          <CustomConfirm
            open={state?.openConfirmStatusModal || false}
            onClose={() => setState({ openConfirmStatusModal: false })}
            onConfirm={() => {
              doUpdateStatus(state?.selectedCctv?.id);
            }}
            title="Hapus CCTV"
            variant="question"
            message={`Apakah anda yakin ingin mengubah status CCTV bernama ${state?.selectedCctv?.name} menjadi ${state?.selectedCctv?.isActive ? 'Tidak Aktif' : 'Aktif'}?`}
          />
        </CardContent>
      </Card>
    </ContainerAdmin>
  </>
};

export default CctvPageView;