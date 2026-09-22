import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PORTFOLIO_ID } from "../../graphql/constants";
import { renderWithApollo } from "../../graphql/test-utils";
import CashAllocationPage from "./page";

import "@testing-library/jest-dom";

function renderCashAllocation(initialEntry: string) {
  return renderWithApollo(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/cockpit/cash-allocation" element={<CashAllocationPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("CashAllocationPage", () => {
  it("shows an error when portfolioId is missing", () => {
    renderCashAllocation("/cockpit/cash-allocation");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "A portfolio ID is required"
    );
  });

  it("loads portfolio context and allocation breakdown", async () => {
    renderCashAllocation(
      `/cockpit/cash-allocation?portfolioId=${PORTFOLIO_ID}`
    );

    expect(
      screen.getByRole("heading", { name: "Cash Balance Allocation" })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
    });

    expect(screen.getByText("DE89370400440532013000")).toBeInTheDocument();
    expect(screen.getByText("Available cash")).toBeInTheDocument();
    expect(screen.getByText("Invested")).toBeInTheDocument();
  });
});
