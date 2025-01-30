import { useState, useCallback } from 'react'

export function useModalVisibility() {
  const [openModals, setOpenModals] = useState<Set<string>>(new Set())

  const open = useCallback((modalId: string) => {
    setOpenModals(current => {
      const next = new Set(current)
      next.add(modalId)
      return next
    })
  }, [])

  const close = useCallback((modalId: string) => {
    setOpenModals(current => {
      const next = new Set(current)
      next.delete(modalId)
      return next
    })
  }, [])

  const isOpen = useCallback((modalId: string) => {
    return openModals.has(modalId)
  }, [openModals])

  return { open, close, isOpen }
} 