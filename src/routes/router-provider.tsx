import {
  RouterProvider as _RouterProvider,
  createHashRouter,
} from "react-router-dom";

import { useRoutes } from "./routes";

export function RouterProvider() {
  const routes = useRoutes();
  const router = createHashRouter(routes);

  return <_RouterProvider router={router} />;
}
