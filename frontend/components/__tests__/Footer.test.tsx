import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Footer from '../Footer'
import toast from 'react-hot-toast'

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('Footer subscribe', () => {
  it('renders input and button', () => {
    render(<Footer />)
    expect(screen.getByPlaceholderText(/Ochife@Mustapha.com/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('validates empty email', async () => {
    render(<Footer />)
    const user = userEvent.setup()
    await user.click(screen.getByRole('button', { name: /subscribe/i }))
    expect(toast.error).toHaveBeenCalledWith('Please enter an email address.')
  })
})
