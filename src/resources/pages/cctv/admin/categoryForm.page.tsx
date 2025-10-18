import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICategoryFormState } from "@/resources/interfaces/cctv/admin//categoryForm.interface";
import CategoryFormView from "@/resources/views/cctv/admin//categoryForm.view";
import { getAdminCategory, getServiceUnits } from "@/api/api.get";
import { Auth } from "@/core/auth";
import { postCategory } from "@/api/api.post";
import { putCategory } from "@/api/api.put";
import { RouteAdminCctvCategory } from "@/config/routing";

const CategoryFormPage: NextPage = () => {

  const { state, setState } = useCustomState<ICategoryFormState>({
    loading: false,
    category: {},
    formInput: {},
    formError: {}
  });

  const { enqueueSnackbar } = useSnackbar();

  const credentialRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const auth = Auth().get();

  const router = useCustomRouter();

  const doSave = async (evt: FormEvent) => {
    // your action
    evt.preventDefault();

    setState({ loading: true });

    const id = router.query.id as string;

    const response = await (id ? putCategory(id, state.formInput, auth?.token) : postCategory(state.formInput, auth?.token));

    if (response.record) {
      enqueueSnackbar('Kategori CCTV berhasil disimpan.', { variant: 'success' });
      router.push(RouteAdminCctvCategory());
    } else {
      if (response.error?.message) {
        enqueueSnackbar(response.error.message, { variant: 'error' });
      } else {
        setState({ formError: response.error?.errors });
      }
    }

    setState({ loading: false });
  }

  const doGet = async () => {
    const id = router.query.id as string;
    if (!id) return;
    // your action
    setState({ loading: true });
    const response = await getAdminCategory(id, auth?.token);
    if (response.record) {
      setState({ category: response.record, formInput: response.record });
    } else {
      enqueueSnackbar(response.error?.message || 'Gagal mendapatkan data kategori.', { variant: 'error' });
    }

    const responseUnits = await getServiceUnits(auth?.token);
    if (responseUnits.record) {
      setState({ units: responseUnits.record });
    } else {
      enqueueSnackbar(responseUnits.error?.message || 'Gagal mendapatkan data unit layanan.', { variant: 'error' });
    }
    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <CategoryFormView
    router={router}
    doSave={doSave}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CategoryFormPage;