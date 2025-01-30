import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import App from '../App'
import { ModalProvider } from '../components/UILibrary/Modal/ModalContext'
import * as apiCalls from '../apiCalls'

// Mock the API calls
vi.mock('../apiCalls', () => ({
  useDevices: () => ({
    data: [
      {
        id: '1',
        system_name: 'Windows PC',
        type: 'WINDOWS',
        hdd_capacity: 500
      },
      {
        id: '2',
        system_name: 'Mac Pro',
        type: 'MAC',
        hdd_capacity: 1000
      }
    ],
    isLoading: false,
    error: null
  }),
  useAddDevice: () => ({
    mutate: vi.fn(),
    isPending: false
  }),
  useUpdateDevice: () => ({
    mutate: vi.fn(),
    isPending: false
  }),
  useDeleteDevice: () => ({
    mutate: vi.fn(),
    isPending: false
  })
}))

describe('Example App Level Tests', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  const renderApp = () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <App />
        </ModalProvider>
      </QueryClientProvider>
    )
  }

  test('should open and close add device modal', async () => {
    renderApp()

    // Click add device button
    const addButton = screen.getByText('Add device')
    fireEvent.click(addButton)

    // Check if modal is open
    await waitFor(() => {
      expect(screen.getByText('System name *')).toBeInTheDocument()
    })

    // Click cancel button
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)

    // Check if modal is closed
    await waitFor(() => {
      expect(screen.queryByText('System name *')).not.toBeInTheDocument()
    })
  })

  test('should open update device modal when clicking edit', async () => {
    renderApp()

    // Find and click the menu button for the first device
    const deviceCards = await screen.findAllByText(/workstation/i)
    const menuButton = deviceCards[0].parentElement?.parentElement?.querySelector('button')
    if (!menuButton) throw new Error('Menu button not found')
    
    fireEvent.mouseEnter(menuButton)

    // Click edit button
    const editButton = await screen.findAllByText('Edit')
    fireEvent.click(editButton[0])

    // Verify update modal is open with device data
    await waitFor(() => {
      expect(screen.getByText('Edit device')).toBeInTheDocument()
    })
  })

  test('should open delete device modal when clicking delete', async () => {
    renderApp()

    // Find and click the menu button for the first device
    const deviceCards = await screen.findAllByText(/workstation/i)
    const menuButton = deviceCards[0].parentElement?.parentElement?.querySelector('button')
    if (!menuButton) throw new Error('Menu button not found')
    
    fireEvent.mouseEnter(menuButton)

    // Click delete button
    const deleteButton = await screen.findAllByText('Delete')
    fireEvent.click(deleteButton[0])

    // Verify delete modal is open
    await waitFor(() => {
      expect(screen.getByText('Delete device?')).toBeInTheDocument()
    })
  })

  test('should handle form submission in add device modal', async () => {
    const addDeviceMock = vi.fn()
    vi.spyOn(apiCalls, 'useAddDevice').mockImplementation(() => ({
      mutate: addDeviceMock,
      isPending: false,
      isError: false,
      error: null,
      data: undefined,
      variables: undefined,
      isSuccess: false,
      isLoading: false,
      isIdle: true,
      status: 'idle',
      reset: vi.fn(),
      context: undefined,
      failureCount: 0,
      failureReason: null,
      isPaused: false,
      submittedAt: 0,
      mutateAsync: vi.fn(),
    }))

    renderApp()

    // Open add device modal
    fireEvent.click(screen.getByText('Add device'))

    // Fill out the form
    fireEvent.change(screen.getByLabelText('system-name'), {
      target: { value: 'Test Device' }
    })
    fireEvent.change(screen.getByLabelText('device-type'), {
      target: { value: 'WINDOWS' }
    })
    fireEvent.change(screen.getByLabelText('hdd-capacity'), {
      target: { value: '500' }
    })

    // Submit the form
    fireEvent.click(screen.getByText('Submit'))

    // Verify submission
    await waitFor(() => {
      expect(addDeviceMock).toHaveBeenCalledWith({
        system_name: 'Test Device',
        type: 'WINDOWS',
        hdd_capacity: 500
      }, expect.any(Object))
    })
  })

  test('should show validation errors when submitting empty form', async () => {
    renderApp()

    // Open add device modal
    fireEvent.click(screen.getByText('Add device'))

    // Submit empty form
    fireEvent.click(screen.getByText('Submit'))

    // Check for validation message
    await waitFor(() => {
      expect(screen.getByText('Please fill all fields')).toBeInTheDocument()
    })
  })
}) 