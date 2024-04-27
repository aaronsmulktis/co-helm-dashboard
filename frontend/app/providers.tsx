'use client';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: React.PropsWithChildren<{}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ToastContainer
        // id="myContainer"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        stacked
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </QueryClientProvider>
  )
};