export interface IRouterPage {
  /**
   * @param pathName
   *
   * Cara menggunakan pathName
   * ```typescript
   * pathName="/user/list/{any}/{number}"
   * ```
   */
  pathName: string;

  /**
   * @param removeWhenInactive
   *
   * Digunakan untuk membuang component apabila Route/URL tidak sesuai dengan pathName atah query
   *
   * Default FALSE
   */
  removeWhenInactive?: boolean;


  /**
   * @param removeWhenQueryInnactive
   * 
   * Digunakan untuk membuat component apabila Route/URL dari Query Params ketika tidak sesuai dengan query di URL
   * 
   * Default FALSE
   */
  removeWhenQueryNotMatches ?: boolean;


  /**
   * @param isWithoutQuery
   *
   * Digunakan untuk mengabaikan halaman apabila ada query params
   *
   * Default FALSE
   */
  isWithoutQuery?: boolean;

  /**
   * @object where
   * 
   * Digunakan untuk mencocokan Route/URL
   * ```typescript
    where: {
      page: "form"
    }
   * ```
   */
  where?: {};

  /**
   * @object orWhere
   *
   * Digunakan untuk mencocokan Route/URL apabila query di 'where' tidak ditemukan/tidak cocok dengan Route/URL sekarnag
   * ```typescript
   * orWhere: {
   *  page: "{any}"
   * }
   * ```
   */
  orWhere?: {};

  /**
   *
   * @param isActive
   * @returns JSX.Element
   *
   * Parameter isActive akan bernilai TRUE ketika Route/URL sesuai dengan pathName maupun query
   * ```typescript
   * onUpdate={(isActive) => {
   *  return <UserView isActive={isActive}/>
   * }}
   * ```
   */
  onUpdate: (isActive: boolean) => JSX.Element;
}
