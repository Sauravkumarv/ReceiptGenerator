import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import Button from '@/components/common/Button'

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  test('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('applies correct variant styles', () => {
    render(<Button variant="success">Success Button</Button>)
    const button = screen.getByText('Success Button')
    expect(button).toHaveClass('bg-success-500')
  })

  test('shows loading state', () => {
    render(<Button loading>Loading Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('cursor-wait')
  })

  test('is disabled when loading', () => {
    render(<Button loading>Loading Button</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})