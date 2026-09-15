import React from "react";
import ReactDOM from "react-dom/client";
import ProductDetails from "./product-details/page";
import "./globals.css";
import { createApolloClient } from "./graphql/client";
import { ApolloProvider } from "@apollo/client";

async function enableApiMocking() {
  if (process.env.REACT_APP_GRAPHQL_MOCK !== "true") {
    return
  }

  const { worker } = await import("./mocks/browser")
  await worker.start({
    onUnhandledRequest: "bypass",
  })
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

enableApiMocking().then(() => {
  const client = createApolloClient()

  root.render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <div className={"container"}>
          <ProductDetails />
        </div>
      </ApolloProvider>
    </React.StrictMode>
  );
})


