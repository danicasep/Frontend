import { NextPage } from "next";
import { useCustomRouter } from "src/core/helper/general";
import { useCustomState } from "src/core/helper/state.helper";
import { useSnackbar } from "notistack";
import { FormEvent, useEffect, useRef } from "react";
import { ILoginState } from "@/resources/interfaces//login.interface";
import LoginView from "@/resources/views//login.view";
import { postLogin } from "@/api/api.post";
import { Auth } from "@/core/auth";

const LoginPage: NextPage = () => {

  const {state, setState} = useCustomState<ILoginState>({
    loading: false,
    formError: {},
    isForever: false
  });

  const { enqueueSnackbar } = useSnackbar();

  const credentialRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const router = useCustomRouter();

  const auth = Auth();

  const doLogin = async (evt: FormEvent) => {
    evt.preventDefault();
    setState({loading: true})

    const response = await postLogin({
      username: state?.username,
      password: state?.password
    });

    if(response.record) {
      const data = {
        data: response.record?.data?.user,
        token: response.record?.data?.token
      }
      
      auth.set(data, state?.isForever)
      router.push("/account");
      return;
    }
    
    const error = response.error;
    if(error?.message != null) {
      enqueueSnackbar({
        message: error?.message,
        variant: "error",
        anchorOrigin:{vertical: "top", horizontal: "right"}
      })
      setState({
        formError: error?.errors
      });
    }
    setState({loading: false, formError: error?.errors})
  }

  useEffect(() => {
    console.log(auth.get())
  }, []);

  return <LoginView
    router={router}
    doLogin={doLogin}
    refs={{credentialRef: credentialRef, passwordRef: passwordRef}}
    setState={setState}
    state={state}
  />
}

export default LoginPage;