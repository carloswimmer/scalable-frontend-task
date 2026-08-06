import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PortfolioNameValue } from "../components/portfolio-name-value";

import "@testing-library/jest-dom";

const labels = {
  edit: "Edit portfolio name",
  save: "Save portfolio name",
  cancel: "Cancel editing portfolio name",
  input: "Portfolio name",
} as const;

async function enterEditMode(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: labels.edit }));

  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
}

function fireMaxWidthTransitionEnd(element: HTMLElement) {
  const event = new Event("transitionend", { bubbles: true });
  Object.defineProperty(event, "propertyName", { value: "max-width" });
  element.dispatchEvent(event);
}

async function completeCollapse(input: HTMLElement) {
  await waitFor(() => {
    act(() => {
      fireMaxWidthTransitionEnd(input.parentElement!);
    });
    expect(screen.queryByRole("textbox", { name: labels.input })).not.toBeInTheDocument();
  });
}

async function saveEdit(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: labels.save }));
  await completeCollapse(screen.getByRole("textbox", { name: labels.input }));
}

async function cancelEdit(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: labels.cancel }));
  await completeCollapse(screen.getByRole("textbox", { name: labels.input }));
}

describe("PortfolioNameValue", () => {
  it("renders the initial portfolio name", () => {
    render(<PortfolioNameValue />);

    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("enters edit mode when the edit button is clicked", async () => {
    const user = userEvent.setup();
    render(<PortfolioNameValue />);

    await enterEditMode(user);

    expect(screen.getByRole("textbox", { name: labels.input })).toHaveValue("Broker Portfolio");
    expect(screen.getByRole("button", { name: labels.save })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: labels.cancel })).toBeInTheDocument();
  });

  it("saves a new portfolio name", async () => {
    const user = userEvent.setup();
    render(<PortfolioNameValue />);

    await enterEditMode(user);

    const input = screen.getByRole("textbox", { name: labels.input });
    await user.clear(input);
    await user.type(input, "Growth Portfolio");
    await saveEdit(user);

    expect(screen.getByText("Growth Portfolio")).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("cancels editing and keeps the original name", async () => {
    const user = userEvent.setup();
    render(<PortfolioNameValue />);

    await enterEditMode(user);

    const input = screen.getByRole("textbox", { name: labels.input });
    await user.clear(input);
    await user.type(input, "Temporary Name");
    await cancelEdit(user);

    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
    expect(screen.queryByText("Temporary Name")).not.toBeInTheDocument();
  });

  it("saves when Enter is pressed", async () => {
    const user = userEvent.setup();
    render(<PortfolioNameValue />);

    await enterEditMode(user);

    const input = screen.getByRole("textbox", { name: labels.input });
    await user.clear(input);
    await user.type(input, "Enter Saved{Enter}");
    await completeCollapse(input);

    expect(screen.getByText("Enter Saved")).toBeInTheDocument();
  });

  it("cancels when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<PortfolioNameValue />);

    await enterEditMode(user);

    const input = screen.getByRole("textbox", { name: labels.input });
    await user.clear(input);
    await user.type(input, "Escape Test");
    await user.keyboard("{Escape}");
    await completeCollapse(input);

    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
  });

  it("does not update the name when saving empty or whitespace-only input", async () => {
    const user = userEvent.setup();
    render(<PortfolioNameValue />);

    await enterEditMode(user);

    const input = screen.getByRole("textbox", { name: labels.input });
    await user.clear(input);
    await user.type(input, "   ");
    await saveEdit(user);

    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
  });
});
