import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <QueryClientProvider client={new QueryClient()}>
            <App />
          </QueryClientProvider>
        </ChakraProvider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
