import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LanguageProvider } from "./lang";
import { RouterProvider } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <RouterProvider />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
