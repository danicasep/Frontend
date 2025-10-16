import { NextRequest, NextResponse } from "next/server";

export class Route {
  
  private static req: NextRequest;

  static init(req: NextRequest) {
    this.req = req;
  }

  static routeConfig = new Array();

  static group(config: {prefix?: string, middleware?: string}, callbackRoute: () => void) {
    
    callbackRoute();

    let name = null;
    if(config.prefix) name = `prefix:${config.prefix}`;
    else name = `auth:${config.middleware}`;

    this.routeConfig.push({
      group: {
        name: name,
        routes: this.routeConfig
      }
    });
  }

  static get(url: string, controller: any) {
    this.routeConfig.push({url: url, route: controller(this.req), method: "GET"});
  }
}