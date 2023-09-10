import "./index.scss"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./Settings";
import { QueryClient, QueryClientProvider } from "react-query";
import { CartProvider } from "react-use-cart";
const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <CartProvider>
          <App />
        </CartProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
