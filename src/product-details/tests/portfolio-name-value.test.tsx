import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PortfolioNameValue } from "../components/portfolio-name-value"

import "@testing-library/jest-dom"

type User = ReturnType<typeof userEvent.setup>

const label = {
  edit: 'Edit portfolio name',
  save: 'Save portfolio name',
  cancel: 'Cancel editing portfolio name',
  input: 'Portfolio name'
}

async function enterEditMode(user: User) {
  await user.click(screen.getByRole('button', { name: label.edit }))

  await act(async () => {
    await new Promise(resolve => requestAnimationFrame(resolve))
  })
}

async function saveEdit(user: User) {
  await user.click(screen.getByRole('button', { name: label.save }))
  await completeCollapse(screen.getByRole('textbox', { name: label.input }))
}

async function completeCollapse(input: HTMLInputElement) {
  await act(() => {
    fireMaxWidthTransitionEnd(input.parentElement!)
  })
  expect(screen.queryByRole('textbox', { name: label.input })).not.toBeInTheDocument()
}

function fireMaxWidthTransitionEnd(element: HTMLElement) {
  const event = new Event('transitionend', { bubbles: true })
  Object.defineProperty(event, 'propertyName', { value: 'max-width' })
  element.dispatchEvent(event)
}

async function cancelEdit(user: User) {
  await user.click(screen.getByRole('button', { name: label.cancel }))
  await completeCollapse(screen.getByRole('textbox', { name: label.input }))
}

describe('PortfolioNameValue', () => {
  let user: User

  beforeEach(() => {
    user = userEvent.setup()
    render(<PortfolioNameValue/>)
  })

  it('renders the initial portfolio name', () => {
    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('enters the edit mode when the edit button is clicked', async () => {
    await enterEditMode(user)

    expect(screen.getByRole('textbox', { name: label.input })).toHaveValue('Broker Portfolio')
    expect(screen.getByRole('button', { name: label.save })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: label.cancel })).toBeInTheDocument()
  })

  it('saves a new portfolio name', async () => {
    await enterEditMode(user)

    const input = screen.getByRole('textbox', { name: label.input })
    await user.clear(input)
    await user.type(input, 'Growth Portfolio')
    await saveEdit(user)

    expect(screen.getByText('Growth Portfolio')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: label.input })).not.toBeInTheDocument()
  })

  it('cancels editing and keeps the original name', async () => {
    await enterEditMode(user)

    const input = screen.getByRole('textbox', { name: label.input })
    await user.clear(input)
    await user.type(input, 'Temporary Name')
    await cancelEdit(user)

    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
    expect(screen.queryByText('Temporary Name')).not.toBeInTheDocument()
  })

  it('saves when Enter is pressed', async () => {
    await enterEditMode(user)

    const input: HTMLInputElement = screen.getByRole('textbox', { name: label.input })
    await user.clear(input)
    await user.type(input, 'Enter Saved')
    await user.keyboard('{Enter}')
    await completeCollapse(input)

    expect(screen.getByText('Enter Saved')).toBeInTheDocument()
  })

  it('cancels when Escape is pressed', async () => {
    await enterEditMode(user)

    const input: HTMLInputElement = screen.getByRole('textbox', { name: label.input })
    await user.clear(input)
    await user.type(input, 'Escape Test')
    await user.keyboard('{Escape}')
    await completeCollapse(input)

    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
  })

  it("does not update the name when saving empty or whitespace-only input", async () => {
    await enterEditMode(user);

    const input = screen.getByRole("textbox", { name: label.input });
    await user.clear(input);
    await user.type(input, "   ");
    await saveEdit(user);

    expect(screen.getByText("Broker Portfolio")).toBeInTheDocument();
  });
})