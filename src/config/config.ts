import { IMiddlewareExcept, IMiddlewareGroup } from "@/core/middleware.interface";


export const MIDDLEWARE_CONFIG = () => {

  const PUBLIC_TOKEN = "$2y$12$pzmosxbw.JQ92udPMS7PhuV/hKOE7yT4.DzF5HfZXt06y.d7R2fWm";
  const CCTV_URI = "http://36.64.206.50:3333";

  /**
   * Session menggunakan cookie
   * 
   * default untuk expired ialah 7200 = 2 jam
   */
  const expired: number = 7200; // 2 hours

  /**
   * Opsi ini digunakan untuk dijadikan patokan guard
   * 
   * atau key untuk session nya
   */
  const defaultGuard: string = "smart-laundry-tech-user";

  /**
   * Opsi guards disini bertipe string[]
   * 
   * Digunakan untuk membuat beberapa guard sesuai dengan selera anda
   */
  const guards: string[] = ["smart-laundry-tech-user"];

  /**
   * Opsi except digunakan untuk mengatur middleware
   * 
   * yang mana halaman yang akan dikecualikan apabila session guard aktif
   */
  const except: IMiddlewareExcept[] = [
    {
      routes: [
        "/",
        "/forgot",
        "/logout"
      ],
      redirectAuthenticed: "/account",
    }
  ];
  
  /**
   * Opsi middleware digunakan untuk mengatur middleware 
   * 
   * yang mana halaman akan divalidasi apakah session guard aktif 
   * 
   * sesuai dengan defaultGuard atau guardName dari opsi middleware itu sendiri
   */
  const middleware: IMiddlewareGroup[] = [
    {
      redirectUnauthenticed: "/",
      prefixRoute: "/account",
      group: [
        "/users",
        "/bots",
        "/funds",
        "/pools",
        "/sites",
        "/pro",
        "/privileges"
      ]

    }
  ];

  return {
    defaultGuard,
    guards,
    except,
    middleware,
    expired,
    PUBLIC_TOKEN,
    CCTV_URI
  };
}

export const ConfigGlobal = {
  view: {
    mobileView: 720,
    tabletView: 900
  }
}