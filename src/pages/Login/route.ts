import { lazy } from "react";

const LoginRoute: any = {
  id: "login",
  path: "/",
  hideMenu: true,
  public: true,
  component: lazy(() => import(".")),
};

export default LoginRoute;
