import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { Session } from "@/pages/session";

export function useRoutes() {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/session",
          element: <Session />,
        },
      ],
    },
  ];
}
