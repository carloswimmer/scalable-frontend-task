import React from "react";
import ReactDOM from "react-dom/client";
import ProductDetails from "./product-details/page";
import "./globals.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className={"container"}>
      <ProductDetails />
    </div>
  </React.StrictMode>
);
