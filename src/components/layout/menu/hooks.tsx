import { BarChart3, BookText, Settings } from "lucide-react";
import { useIntl } from "react-intl";

export function useMenuItems() {
  const intl = useIntl();

  return [
    {
      title: intl.formatMessage({
        id: "menu.stats",
        defaultMessage: "Statistics",
      }),
      icon: <BarChart3 size={20} />,
      url: "/statistics",
    },
    {
      title: intl.formatMessage({
        id: "menu.all-questions",
        defaultMessage: "All questions",
      }),
      icon: <BookText size={20} />,
      url: "/all-questions",
    },
    {
      title: intl.formatMessage({
        id: "menu.settings",
        defaultMessage: "Settings",
      }),
      icon: <Settings size={20} />,
      url: "/settings",
    },
  ];
}
