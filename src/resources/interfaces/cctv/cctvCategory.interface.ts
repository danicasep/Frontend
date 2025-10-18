import { CctvCategory } from "@/models/cctvCategory";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICctvCategoryState {
  loading?: boolean;
  categories?: CctvCategory[];
}

export interface ICctvCategoryView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICctvCategoryState | undefined; 
  setState: Dispatch<ICctvCategoryState>;
  doSave: (evt: FormEvent) => Promise<void>;
}