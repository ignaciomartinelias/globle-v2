import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Game } from "./Game";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Game />
    </QueryClientProvider>
  );
};

export default App;
