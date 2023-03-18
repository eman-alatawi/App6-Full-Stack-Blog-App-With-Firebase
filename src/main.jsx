import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  // </React.StrictMode>
);
