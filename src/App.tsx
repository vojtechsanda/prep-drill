import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "./components/ui/toaster";
import { LanguageProvider } from "./lang";
import { RouterProvider } from "./routes";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <RouterProvider />
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
