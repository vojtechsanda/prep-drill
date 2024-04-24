import { Outlet } from "react-router-dom";

import { Menu } from "./menu";

export function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
