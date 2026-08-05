import { render, screen } from "@testing-library/react";
import { SecuritiesAccount } from "./securities-account";

import "@testing-library/jest-dom";

describe("SecuritiesAccount", () => {
  it("should display account number and BIC", async () => {
    render(<SecuritiesAccount />);

    expect(screen.getByText("Securities account")).toBeVisible();
    expect(screen.getByText("Account number")).toBeVisible();
    expect(screen.getByText("5134823356")).toBeVisible();
    expect(screen.getByText("BIC")).toBeVisible();
    expect(screen.getByText("SCABDEMMXXX")).toBeVisible();
  });
});
