import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PortfolioName } from "../components/portfolio-name";

import "@testing-library/jest-dom";

describe("PortfolioName", () => {
  it("should render portfolio name", () => {
    render(<PortfolioName />);

    expect(screen.getByText("Portfolio name")).toBeInTheDocument();
    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
  });

  it("should save a renamed portfolio", async () => {
    const user = userEvent.setup();
    render(<PortfolioName />);
    await user.click(screen.getByRole("button", { name: "Edit portfolio name" }));
    const input = screen.getByRole("textbox", { name: "Portfolio name" });
    await user.clear(input);
    await user.type(input, "Growth Portfolio");
    await user.click(screen.getByRole("button", { name: "Save portfolio name" }));
    expect(screen.getByText("Growth Portfolio")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
