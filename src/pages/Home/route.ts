import { lazy } from "react";

const HomeRoute: any = {
  id: "home",
  path: "/home",
  public: false,
  hideMenu: false,
  component: lazy(() => import(".")),
};

export default HomeRoute;
