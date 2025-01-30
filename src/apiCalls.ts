import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Device } from './types/device'

export function useAddDevice() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (newDevice: Partial<Device>) => 
      fetch('http://localhost:3000/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDevice)
      }).then(res => res.json()),
    
    onSuccess: () => {
      // Invalidate and refetch devices list
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    }
  })
}

export function useDeleteDevice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (deviceId: string) =>
        fetch(`http://localhost:3000/devices/${deviceId}`, { method: 'DELETE' }).then(res => res.json()),
    
    onSuccess: () => {
      // Invalidate and refetch devices list
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    }
  })
}

export function useUpdateDevice() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (device: Device) =>
      fetch(`http://localhost:3000/devices/${device.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(device)
      }).then(res => res.json()),
    
    onSuccess: () => {
      // Invalidate and refetch devices list
      queryClient.invalidateQueries({ queryKey: ['devices'] })
    }
  })
}   