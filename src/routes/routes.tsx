import App from "@/App";
import { Layout } from "@/components/layout";

export function useRoutes() {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <App /> }],
    },
  ];
}
