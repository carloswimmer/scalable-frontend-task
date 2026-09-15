import { render, Screen, screen } from "@testing-library/react"
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
}

function getInput(screen: Screen): HTMLInputElement {
  return screen.getByRole('textbox', { name: label.input })
}

function getSaveButton(screen: Screen): HTMLButtonElement {
  return screen.getByRole('button', { name: label.save })
}

function getCancelButton(screen: Screen): HTMLButtonElement {
  return screen.getByRole('button', { name: label.cancel })
}

describe('PortfolioNameValue', () => {
  let user: User

  beforeEach(() => {
    user = userEvent.setup()
    render(<PortfolioNameValue initialState="Broker Portfolio" onSave={vi.fn()} />)
  })

  it('renders the initial portfolio name', () => {
    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('enters edit mode when the edit button is clicked', async () => {
    await enterEditMode(user)

    expect(getInput(screen)).toHaveValue('Broker Portfolio')
    expect(getSaveButton(screen)).toBeInTheDocument()
    expect(getCancelButton(screen)).toBeInTheDocument()
  })

  it('saves a new portfolio name', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, 'Growth Portfolio')
    await user.click(getSaveButton(screen))

    expect(screen.getByText('Growth Portfolio')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('cancels editing and keeps the original name', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, 'Temporary Name')
    await user.click(getCancelButton(screen))

    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
    expect(screen.queryByText('Temporary Name')).not.toBeInTheDocument()
  })

  it('saves when Enter is pressed', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, 'Enter Saved{Enter}')

    expect(screen.getByText('Enter Saved')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('cancels when Escape is pressed', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, 'Escape Test')
    await user.keyboard('{Escape}')

    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('does not update the name when saving empty or whitespace-only input', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, '   ')
    await user.click(getSaveButton(screen))

    expect(screen.getByText('Broker Portfolio')).toBeInTheDocument()
  })

  it('shows an error when try to save name with less than 3 caracters', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, 'BP')
    await user.click(getSaveButton(screen))

    expect(screen.getByRole('alert')).toHaveTextContent('Minimum of 3 characters')
  })

  it('shows an error when try to save name with more than 50 caracters', async () => {
    await enterEditMode(user)

    const input = getInput(screen)
    await user.clear(input)
    await user.type(input, '0123456789 0123456789 0123456789 0123456789 0123456789')
    await user.click(getSaveButton(screen))

    expect(screen.getByRole('alert')).toHaveTextContent('Maximum of 50 characters')
  })
})
