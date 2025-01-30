import { type Device } from '../types/device'
import { WindowsIcon, AppleIcon, LinuxIcon, HamburgerIcon } from './UILibrary/icons'

interface DeviceCardProps {
  device: Device
  openUpdateDeviceModal: (device: Device) => void
  openDeleteDeviceModal: (device: Device) => void
}

export function getHddCapacityUnit(capacity: number): string {
  return capacity >= 1000 ? 'TB' : 'GB'
}
  
export function formatHddCapacity(capacity: number): string {
  return capacity >= 1000 
    ? Math.round(capacity / 1000).toString() 
    : capacity.toString()
}

export function DeviceCard({ device, openUpdateDeviceModal, openDeleteDeviceModal }: DeviceCardProps) {
  const Icon = {
    WINDOWS: WindowsIcon,
    MAC: AppleIcon,
    LINUX: LinuxIcon,
  }[device.type]

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 py-2 px-4 hover:bg-neutral-50 group/card">
      <div>
        <div className="flex items-center">
            <Icon className="h-4 w-4 text-gray-500 fill-neutral-600" />
            <h3 className="font-medium text-sm leading-4 pl-2 text-neutral-900">{device.system_name}</h3>
        </div>
        <p className="text-xs text-neutral-500">
            {/* Capitalize the first letter of the device type */}
            {device.type[0] + device.type.slice(1).toLocaleLowerCase()} workstation - {formatHddCapacity(device.hdd_capacity)} {getHddCapacityUnit(device.hdd_capacity)}
        </p>
      </div>

      {/* Desktop View: hover states work on desktop, so we can hide the buttons until hovered */}
      <div className="relative group/edit hidden md:block">
        <button className="h-8 w-8 gap-2 p-2 rounded-sm hover:bg-neutral-100 group-hover/card:block hidden cursor-pointer">
            <HamburgerIcon className="h-5 w-5 text-gray-500" />
        </button>
        {/* Dropdown Menu */}
        <div className="absolute right-0 top-full hidden group-hover/edit:block bg-white shadow-lg rounded-sm border border-gray-200 w-32 z-10">
            <button 
              onClick={() => openUpdateDeviceModal(device)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50"
            >
              Edit
            </button>
            <button 
              onClick={() => openDeleteDeviceModal(device)}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
            >
              Delete
            </button>
        </div>
      </div>

      {/* Mobile View: hover states do not work on mobile, so we need to show the buttons all the time */}
      <div className="md:hidden flex flex-row">
        <button 
          onClick={() => openUpdateDeviceModal(device)}
          className="w-full text-left px-4 py-2 hover:bg-gray-50"
        >
          Edit
        </button>
        <button 
          onClick={() => openDeleteDeviceModal(device)}
          className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600"
        >
          Delete
        </button>
      </div>
      
    </div>
  )
} 