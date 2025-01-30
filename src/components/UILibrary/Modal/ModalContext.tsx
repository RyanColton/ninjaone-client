import { createContext, useContext, useCallback, type ReactNode, useState } from 'react'
import { useDisclosure } from './useDisclosure';

interface ModalContextType {
  openModal: (modalId: string, data?: any) => void
  closeModal: (modalId: string) => void
  isOpen: (modalId: string) => boolean
  getModalData: (modalId: string) => any
}

const ModalContext = createContext<ModalContextType | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalData, setModalData] = useState<Record<string, any>>({})
  const modals = useDisclosure()

  const openModal = useCallback((modalId: string, data?: any) => {
    if (data) {
      setModalData(prev => ({ ...prev, [modalId]: data }))
    }
    modals.open(modalId)
  }, [modals])

  const closeModal = useCallback((modalId: string) => {
    modals.close(modalId)
  }, [modals])

  const isOpen = useCallback((modalId: string) => {
    return modals.isOpen(modalId)
  }, [modals])

  const getModalData = useCallback((modalId: string) => {
    return modalData[modalId]
  }, [modalData])

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen, getModalData }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(modalId: string) {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return {
    isOpen: context.isOpen(modalId),
    onOpen: (data?: any) => context.openModal(modalId, data),
    onClose: () => context.closeModal(modalId),
    data: context.getModalData(modalId)
  }
} 