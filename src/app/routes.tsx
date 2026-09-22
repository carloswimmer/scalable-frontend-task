import { Route, Routes } from "react-router-dom";
import CashAllocationPage from "../cockpit/cash-allocation/page";
import ProductDetails from "../product-details/page";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ProductDetails />} />
      <Route
        path="/cockpit/cash-allocation"
        element={<CashAllocationPage />}
      />
    </Routes>
  );
}
