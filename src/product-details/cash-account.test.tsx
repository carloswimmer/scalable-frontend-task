import { render, screen } from "@testing-library/react";
import { CashAccount } from "./cash-account";

import "@testing-library/jest-dom";

describe("CashAccount", () => {
  it("renders IBAN and BIC when data is available", () => {
    render(<CashAccount />);

    expect(screen.getByRole("heading", { name: "Cash account" })).toBeVisible();
    expect(screen.getByText("IBAN")).toBeVisible();
    expect(screen.getByText("DE89370400440532013000")).toBeVisible();
    expect(screen.getByText("BIC")).toBeVisible();
    expect(screen.getByText("COBADEFFXXX")).toBeVisible();
  });

  it("renders Cash Balance Allocation link when onboarding is complete", () => {
    render(<CashAccount />);

    expect(screen.getByText("Cash Balance Allocation")).toBeVisible();
    const link = screen.getByText("Cash Balance Allocation");
    expect(link).toHaveAttribute(
      "href",
      `/cockpit/cash-allocation?portfolioId=oCt4GtuDS2YjimboYTBfNu`
    );
    expect(link).toHaveAttribute("target", "_blank");
  });
});
