import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";

export function useRoutes() {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ];
}
