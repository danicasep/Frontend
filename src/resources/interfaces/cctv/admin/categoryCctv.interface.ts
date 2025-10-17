import { CctvCategory } from "@/models/cctvCategory";
import { NextRouter } from "next/router";
import { Dispatch, FormEvent } from "react";

export interface ICategoryCctvState {
  loading?: boolean;
  categories?: CctvCategory[]
  openConfirmModal?: boolean;
  selectedCategory?: CctvCategory;
}

export interface ICategoryCctvView {
  refs?: {
    credentialRef: any, 
    passwordRef: any
  };
  router: NextRouter;
  state: ICategoryCctvState | undefined; 
  setState: Dispatch<ICategoryCctvState>;
  doSave: (evt: FormEvent) => Promise<void>;
  doDelete: (id: any) => Promise<void>;
}