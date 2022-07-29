import { lazy } from "react";

const AGGridRoute: any = {
  id: "aggrid",
  path: "/ag-grid",
  hideMenu: false,
  public: false,
  component: lazy(() => import(".")),
};

export default AGGridRoute;
