import {
  BarChart3,
  BookText,
  GraduationCap,
  Home,
  Settings,
} from "lucide-react";
import { ReactNode } from "react";
import { useIntl } from "react-intl";

type MenuItem = {
  title: string;
  icon: ReactNode;
  url: string;
  hide?: boolean;
};

export function useMenuItems() {
  const intl = useIntl();

  return [
    {
      title: intl.formatMessage({
        id: "menu.home",
        defaultMessage: "Home",
      }),
      icon: <Home size={20} />,
      url: "/",
    },
    {
      title: intl.formatMessage({
        id: "menu.session",
        defaultMessage: "Session",
      }),
      icon: <GraduationCap size={20} />,
      url: "/session",
    },
    {
      title: intl.formatMessage({
        id: "menu.stats",
        defaultMessage: "Statistics",
      }),
      icon: <BarChart3 size={20} />,
      url: "/statistics",
      hide: true,
    },
    {
      title: intl.formatMessage({
        id: "menu.all-questions",
        defaultMessage: "All questions",
      }),
      icon: <BookText size={20} />,
      url: "/all-questions",
      hide: true,
    },
    {
      title: intl.formatMessage({
        id: "menu.settings",
        defaultMessage: "Settings",
      }),
      icon: <Settings size={20} />,
      url: "/settings",
      hide: true,
    },
  ] satisfies MenuItem[];
}
