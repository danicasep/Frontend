import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { ICctvFormState } from "@/resources/interfaces/cctv/admin//cctvForm.interface";
import CctvFormView from "@/resources/views/cctv/admin//cctvForm.view";
import { getAdminCategories, getAdminCctv } from "@/api/api.get";
import { Auth } from "@/core/auth";
import { RouteAdminCctv } from "@/config/routing";
import { postCctv } from "@/api/api.post";
import { putCctv } from "@/api/api.put";

const CctvFormPage: NextPage = () => {

  const { state, setState } = useCustomState<ICctvFormState>({
    loading: false
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

    const response = await (id ? putCctv(id, state.formInput, auth?.token) : postCctv(state.formInput, auth?.token));

    if (response.record) {
      enqueueSnackbar('CCTV berhasil disimpan.', { variant: 'success' });
      router.push(RouteAdminCctv());
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
    // your action
    setState({ loading: true });
    const responseCategories = await getAdminCategories(auth?.token);
    if (responseCategories.record) {
      setState({ cctvCategories: responseCategories.record });
    } else {
      enqueueSnackbar(responseCategories.error?.message || 'Gagal mendapatkan data CCTV.', { variant: 'error' });
    }
    setState({ loading: false });

    const id = router.query.id as string;
    if (!id) return;
    // your action
    setState({ loading: true });
    const response = await getAdminCctv(id, auth?.token);
    if (response.record) {
      setState({ cctv: response.record, formInput: response.record });
    } else {
      enqueueSnackbar(response.error?.message || 'Gagal mendapatkan data CCTV.', { variant: 'error' });
    }
    setState({ loading: false });
  }

  useEffect(() => {
    doGet();
  }, []);

  return <CctvFormView
    router={router}
    doSave={doSave}
    refs={{ credentialRef: credentialRef, passwordRef: passwordRef }}
    setState={setState}
    state={state}
  />
}

export default CctvFormPage;