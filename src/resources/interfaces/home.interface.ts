import { CctvCategory } from "@/models/cctvCategory";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface IHomeState {
  loading?: boolean;
  categories?: CctvCategory[];
}

export interface IHomeView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: IHomeState | undefined; 
  setState: Dispatch<IHomeState>;
  doSave: (evt: FormEvent) => Promise<void>;
}