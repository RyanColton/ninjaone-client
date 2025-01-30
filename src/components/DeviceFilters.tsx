import { DeviceType } from '../types/device'
import { type SortField, type SortOrder } from './DeviceList'
import { MagnifyingGlassIcon, ResetIcon } from './UILibrary/icons'
import { Input } from './UILibrary/Input'
import Select from './UILibrary/Select'
import MultiSelect from './UILibrary/MultiSelect'

interface DeviceFiltersProps {
  deviceTypes: Array<DeviceType | 'ALL'>
  setDeviceTypes: (type: Array<DeviceType | 'ALL'>) => void
  sortField: SortField
  setSortField: (field: SortField) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  resetFilters: () => void
}

export function DeviceFilters({
  deviceTypes,
  setDeviceTypes,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  searchTerm,
  setSearchTerm,
  resetFilters,
}: DeviceFiltersProps) {
  return (
    <div className="flex flex-row gap-4 items-start md:items-center justify-between pb-4 w-full">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 w-full md:w-auto">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 fill-[#88859E]" />
          <Input
            type="text"
            aria-label="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full md:min-w-[270px] pl-10"
          />
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto">
          <MultiSelect
            label="Device Type"
            value={deviceTypes}
            onChange={setDeviceTypes}
            className="w-full md:min-w-[200px]"
            aria-label="device type"
          >
            <MultiSelect.Option value="ALL">Device Type: All</MultiSelect.Option>
            {Object.values(DeviceType).map((type) => (
              <MultiSelect.Option key={type} value={type}>
                Device Type: {type.charAt(0) + type.slice(1).toLowerCase()}
              </MultiSelect.Option>
            ))}
          </MultiSelect>
        </div>

        <div className="flex gap-2 items-center w-full md:w-auto">
          <Select
            value={`${sortField}-${sortOrder}`}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const [field, order] = e.target.value.split('-') as [SortField, SortOrder]
              setSortField(field)
              setSortOrder(order)
            }}
            className='w-full md:min-w-[300px]'
            aria-label="sort"
          >
            <Select.Option value="system_name-asc">Sort by: Name (A-Z)</Select.Option>
            <Select.Option value="system_name-desc">Sort by: Name (Z-A)</Select.Option>
            <Select.Option value="hdd_capacity-desc">Sort by: HDD Capacity (Descending)</Select.Option>
            <Select.Option value="hdd_capacity-asc">Sort by: HDD Capacity (Ascending)</Select.Option>
          </Select>
        </div>
      </div>
      <button aria-label="reset filters" onClick={resetFilters} className="text-sm text-gray-600">
        <ResetIcon className="h-5 w-5 fill=[#211F33]" />
      </button>
    </div>
  )
} 