export class BaseUrlHelper {

  private keyBaseUrl = "base-url-helper";

  public set = (type: IBaseUrlHelper) => {
    localStorage.setItem(this.keyBaseUrl, type.toString());
  }

  public get = (): IBaseUrlHelper => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem(this.keyBaseUrl) ?? "0");
  }
}

export enum IBaseUrlHelper {
  production,
  develop
}