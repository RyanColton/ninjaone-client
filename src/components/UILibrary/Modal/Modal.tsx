import { type ReactNode } from 'react'
import { CloseIcon } from '../icons'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ isOpen, onClose, title, children, footer }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-sm w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-2xl leading-7 font-medium text-neutral-900">{title}</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-900 cursor-pointer">
            <CloseIcon className="fill-[#211F33] h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-2 p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}