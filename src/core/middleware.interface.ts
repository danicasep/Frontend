export interface IMiddlewareGroup {
  /**
   * Opsi guardNames digunakan untuk menentukan
   * 
   * memvalidasi halaman yang menggunakan session guard yang ada di opsi guardsName
   * 
   * Apabila guardsName kosong, maka defaultGuard akan dipakai sebagai patokan
   */
  guardNames?: string[];

  /**
   * Mengalihkan halaman apabila halaman yang diakses tidak ada session guardsName ataupun defaultGuard
   */
  redirectUnauthenticed: string;
  
  /**
   * Digunakan untuk membuat url setelah opsi prefixRoute, seperti (contoh):
   * - /users
   * - /privileges
   * 
   * Maka outputnya :
   * - /account/users
   * - /account/privileges
   */
  group: string[];

  /**
   * Membuat group url sebelum opsi group, seperti (contoh):
   * - /account
   * - /admin
   * - dan lain sebagainya
   */
  prefixRoute: string;
}

export interface IMiddlewareExcept {
  
  /**
   * Digunakan untuk membuat beberapa URL/routes akan 
   * 
   * dikecualikan apabila diakses oleh guardName ataupun defaultGuard, seperti (contoh):
   * - /login
   * - /forgot
   */
  routes: string[];

  /**
   * Digunakan untuk mendefinisikan guardName tertentu
   * 
   * yang memiliki pengecualian untuk mengakses halaman dari routes
   */
  guardName?: string;

  /**
   * Mengalihkan halaman ketika session aktif
   * 
   * Apabila guardName kosong maka defaultGuard yang akan dipakai
   */
  redirectAuthenticed?: string;
}