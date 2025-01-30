import { useState, useMemo } from 'react'
import { type Device, type DeviceType } from '../types/device'
import { DeviceCard } from './DeviceCard'
import { DeviceFilters } from './DeviceFilters'

export type SortField = 'system_name' | 'hdd_capacity'
export type SortOrder = 'asc' | 'desc'

interface DeviceListProps {
  data?: Device[]
  isLoading: boolean
  error: Error | null
  openUpdateDeviceModal: (device: Device) => void
  openDeleteDeviceModal: () => void
}

export function DeviceList({ data, isLoading, error, openUpdateDeviceModal, openDeleteDeviceModal }: DeviceListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [deviceType, setDeviceType] = useState<DeviceType | 'ALL'>('ALL')
  const [sortField, setSortField] = useState<SortField>('system_name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const filteredAndSortedDevices = useMemo(() => {
    if (!data) return []

    return data
      .filter((device) => {
        const matchesType = deviceType === 'ALL' || device.type === deviceType
        const matchesSearch = device.system_name.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesType && matchesSearch
      })
      .sort((a, b) => {
        const compareValue = sortOrder === 'asc' ? 1 : -1
        if (sortField === 'system_name') {
          return a.system_name.localeCompare(b.system_name) * compareValue
        }
        return (a.hdd_capacity - b.hdd_capacity) * compareValue
      })
  }, [data, deviceType, sortField, sortOrder, searchTerm])

  const resetFilters = () => {
    setDeviceType('ALL')
    setSearchTerm('')
    setSortField('system_name')
    setSortOrder('asc')
  }

  if (isLoading) return <div>Loading devices...</div>
  if (error) return <div>Error loading devices: {error.message}</div>

  return (
    <div className="flex flex-col items-start flex-1 w-full">
      <DeviceFilters
        deviceType={deviceType}
        setDeviceType={setDeviceType}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resetFilters={resetFilters}
      />
      <p className="text-lg font-medium ml-4 mb-2 text-[#211F33]">Device</p>
      <div className="first: border-t border-[#E7E8EB] grid flex-1 w-full">
        {filteredAndSortedDevices.map((device) => (
          <DeviceCard key={device.id} device={device} openUpdateDeviceModal={openUpdateDeviceModal} openDeleteDeviceModal={openDeleteDeviceModal} />
        ))}
      </div>
    </div>
  )
} 