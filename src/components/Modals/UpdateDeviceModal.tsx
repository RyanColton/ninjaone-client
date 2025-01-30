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
        updateDevice({
            id: device.id,
            system_name: systemName,
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
          <label className="block text-sm font-normal leading-5 text-[#211F33] mb-1">
            System name *
          </label>
          <Input
            required
            type="text"
            value={systemName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSystemName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-normal leading-5 text-[#211F33] mb-1">
            Device type *
          </label>
          <Select
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
          <label className="block text-sm font-normal leading-5 text-[#211F33] mb-1">
            HDD capacity (GB) *
          </label>
          <Input
            required
            type="number"
            value={capacity ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapacity(Number(e.target.value))}
          />
        </div>
      </form>
    </Modal>
  )
}