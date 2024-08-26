import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Globe } from "./Globe";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Globe />
    </QueryClientProvider>
  );
};

export default App;
