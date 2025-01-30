export enum DeviceType {
  WINDOWS = 'WINDOWS',
  MAC = 'MAC',
  LINUX = 'LINUX',
}

export interface Device {
  id: string
  system_name: string
  type: DeviceType
  hdd_capacity: number
} 