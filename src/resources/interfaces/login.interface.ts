import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ILoginState {
  loading?: boolean;
  username?: string;
  password?: string;
  formError?: any;
  isForever?: boolean;
}

export interface ILoginView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ILoginState | undefined; 
  setState: Dispatch<ILoginState>;
  doLogin: (evt: FormEvent) => Promise<void>;
}