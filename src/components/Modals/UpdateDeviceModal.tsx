import { useState } from "react"
import { useUpdateDevice } from '../../apiCalls'
import { Device, DeviceType } from "../../types/device"
import Button from "../UILibrary/Button";
import { Input } from "../UILibrary/Input";
import { Modal } from "../UILibrary/Modal/Modal";
import Select from "../UILibrary/Select";

export const UPDATE_DEVICE_MODAL_ID = 'edit-device-modal'

interface UpdateDeviceModalProps {
    device: Device;
    onClose: () => void;
    isOpen: boolean;
  }

export function UpdateDeviceModal({ device, isOpen, onClose }: UpdateDeviceModalProps) {
    const { mutate: updateDevice, isPending: isUpdatingDevice } = useUpdateDevice()
    const [systemName, setSystemName] = useState<string>(device.system_name)
    const [type, setType] = useState<DeviceType>(device.type)
    const [capacity, setCapacity] = useState<number>(device.hdd_capacity)
    const [error, setError] = useState<string | null>(null)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!capacity || !type || !systemName) {
          setError('Please fill all fields')
          return
        }
        updateDevice({
            id: device.id,
            system_name: systemName.split(' ').join('-').toUpperCase(),
            type: type as DeviceType,
            hdd_capacity: capacity,
        },
        {
            onSuccess: () => {
                onClose()
            },
            onError: (error) => {
                setError('Error updating device')
                console.error('Error updating device:', error)
            }
        }
    )
    }   
  return (
  <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Edit device"
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
      {isUpdatingDevice && <div className="text-blue-500">Updating device...</div>}
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
            required
            type="number"
            value={capacity ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              // this has been done to avoid a leading zero in the input
              setCapacity(e.target.value as unknown as number)}
          />
        </div>
      </form>
    </Modal>
  )
}