import { useState } from 'react'
import { Modal } from '../UILibrary/Modal/Modal'
import Select from '../UILibrary/Select'
import { DeviceType } from '../../types/device'
import { useAddDevice } from '../../apiCalls'
import Button from '../UILibrary/Button'
import { Input } from '../UILibrary/Input'

interface AddDeviceModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ADD_DEVICE_MODAL_ID = 'add-device'

export function AddDeviceModal({ isOpen, onClose }: AddDeviceModalProps) {
  const { mutate: addDevice, isPending: isAddingDevice } = useAddDevice();
  const [systemName, setSystemName] = useState('')
  const [type, setType] = useState<DeviceType | ''>('')
  const [capacity, setCapacity] = useState<number>('' as unknown as number)
  const [error, setError] = useState<string | null>(null)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!capacity || !type || !systemName) {
      setError('Please fill all fields')
      return
    }
    addDevice({
      // this is to ensure the system name is in the correct format matching what the backend expects
      system_name: systemName.split(' ').join('-').toUpperCase(),
      type: type as DeviceType,
      hdd_capacity: capacity,
    }, {
      onSuccess: () => {
        onClose()
      },
      onError: (error) => {
        setError('Error adding device')
        console.error('Error adding device:', error)
      }
    })
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Add device"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      }
    >
      {error && <div className="text-red-500">{error}</div>}
      {isAddingDevice && <div className="text-blue-500">Adding device...</div>}
      <form id="add-device-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="block text-sm font-normal leading-5 text-neutral-900 mb-1">
            System name *
          </p>
          <Input
            aria-label="system-name"
            required
            type="text"
            value={systemName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSystemName(e.target.value)}
          />
        </div>

        <div>
          <p className="block text-sm font-normal leading-5 text-neutral-900 mb-1">
            Device type *
          </p>
          <Select
            aria-label="device-type"
            required
            value={type}
            onChange={(e) => setType(e.target.value as DeviceType)}
          >
            <Select.Option value="">Select type</Select.Option>
            {Object.values(DeviceType).map((type) => (
              <Select.Option key={type} value={type}>
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div>
          <p className="block text-sm font-normal leading-5 text-neutral-900 mb-1">
            HDD capacity (GB) *
          </p>
          <Input
            aria-label="hdd-capacity"
            type="number"
            value={capacity ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              // this has been done to avoid a leading zero in the input
              setCapacity(e.target.value as unknown as number)
            }
          />
        </div>
      </form>
    </Modal>
  )
} 