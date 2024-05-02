import { Outlet } from "react-router-dom";

import { Footer } from "./footer";
import { Menu } from "./menu";

export function Layout() {
  return (
    <div className="flex flex-col h-full p-4 pb-2 mx-auto sm:pb-3 min-h-min sm:p-5 max-w-screen-2xl md:px-6 md:pt-6">
      <Menu />
      <div className="flex-1">
        <div className="grid items-center h-full py-8 justify-items-center">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
