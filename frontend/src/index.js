import React from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Dashboard } from "./components/Dashboard";
import "./index.css";

const queryClient = new QueryClient();

const CeleryView = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
};

const appDiv = document.getElementById("root");
render(<CeleryView />, appDiv);
