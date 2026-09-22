import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import ProductDetails from "../page";
import { renderWithApollo } from "../../graphql/test-utils";

import "@testing-library/jest-dom";

function renderProductDetails() {
  return renderWithApollo(
    <MemoryRouter>
      <ProductDetails />
    </MemoryRouter>
  );
}

describe("ProductDetails", () => {
  it("renders portfolio data from GetPortfolio", async () => {
    renderProductDetails();

    expect(await screen.findByText("Broker Portfolio")).toBeInTheDocument();
    expect(screen.getByText("DE89370400440532013000")).toBeInTheDocument();
    expect(screen.getByText("5134823356")).toBeInTheDocument();
  });

  it("renames the portfolio through the mutation", async () => {
    const user = userEvent.setup();
    renderProductDetails();

    expect(await screen.findByText("Broker Portfolio")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Edit portfolio name" }));
    const input = screen.getByRole("textbox", { name: "Portfolio name" });
    await user.clear(input);
    await user.type(input, "Growth Portfolio");
    await user.click(screen.getByRole("button", { name: "Save portfolio name" }));

    expect(await screen.findByText("Growth Portfolio")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});