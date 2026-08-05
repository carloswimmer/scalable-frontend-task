import { render, screen } from "@testing-library/react";
import { PortfolioName } from "../components/portfolio-name";

import "@testing-library/jest-dom";

describe("PortfolioName", () => {
  it("should render portfolio name", () => {
    render(<PortfolioName />);

    expect(screen.getByText("Portfolio name")).toBeInTheDocument();
    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
  });
});
