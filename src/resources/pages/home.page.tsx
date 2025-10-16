import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { useEffect, useRef, FormEvent } from "react";
import { IHomeState } from "@/resources/interfaces//home.interface";
import HomeView from "@/resources/views//home.view";
import { getCategories } from "@/api/api.get";

const HomePage: NextPage = () => {

  const {state, setState} = useCustomState<IHomeState>({
    loading: false,
    categories: []
  });

  const { enqueueSnackbar } = useSnackbar();

  const credentialRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const router = useCustomRouter();

  const doSave = async (evt: FormEvent) => {
    // your action
    evt.preventDefault();
  }

  const doGet = async () => {
    const response = await getCategories();
    if(response.record) {
      setState({categories: response.record});
    } else {
      enqueueSnackbar(response.error?.message ?? "Failed to load data", { variant: "error" });
    }
  }

  useEffect(() => {
    doGet();
  }, []);

  return <HomeView
    router={router}
    doSave={doSave}
    refs={{credentialRef: credentialRef, passwordRef: passwordRef}}
    setState={setState}
    state={state}
  />
}

export default HomePage;