import { Link } from "react-router-dom";

import LogoUrl from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";

import { useMenuItems } from "./hooks";

export function Menu() {
  const menuItems = useMenuItems();

  return (
    <div className="flex items-center justify-between">
      <Link className="flex items-center gap-1 select-none" to="/">
        <img
          src={LogoUrl}
          alt="PrepDrill"
          className="w-8 h-8 sm:w-10 sm:h-10"
        />
        <h1 className="text-2xl font-semibold sm:text-3xl">PrepDrill</h1>
      </Link>

      <div className="flex gap-2">
        {/* Desktop */}
        {menuItems.map((item) => (
          <Button asChild key={item.url} className="hidden sm:flex">
            <Link to={item.url}>
              {item.icon}
              {item.title}
            </Link>
          </Button>
        ))}

        {/* Mobile */}
        {menuItems.map((item) => (
          <Button asChild size="icon" key={item.url} className="sm:hidden">
            <Link to={item.url}>{item.icon}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
