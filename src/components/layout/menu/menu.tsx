import { Link, useLocation } from "react-router-dom";

import LogoUrl from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useMenuItems } from "./hooks";

function useIsActiveFn() {
  const { pathname } = useLocation();

  return (url: string) => pathname == url;
}

export function Menu() {
  const menuItems = useMenuItems();

  const isActive = useIsActiveFn();

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
        {menuItems
          .filter((item) => !item.hide)
          .map((item) => (
            <Button
              asChild
              key={item.url}
              className={cn(
                "hidden sm:flex",
                isActive(item.url) && "translate-y-0.5",
              )}
            >
              <Link to={item.url}>
                {item.icon}
                {item.title}
              </Link>
            </Button>
          ))}

        {/* Mobile */}
        {menuItems
          .filter((item) => !item.hide)
          .map((item) => (
            <Button
              asChild
              size="icon"
              key={item.url}
              className={cn(
                "sm:hidden",
                isActive(item.url) && "translate-y-0.5",
              )}
            >
              <Link to={item.url}>{item.icon}</Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
