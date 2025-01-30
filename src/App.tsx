import './App.css'
import { useQuery } from '@tanstack/react-query'
import { DeviceList } from './components/DeviceList'
import Header from './components/Header'
import { PlusIcon } from './components/UILibrary/icons'
import { useModal } from './components/UILibrary/Modal/ModalContext'
import { AddDeviceModal, ADD_DEVICE_MODAL_ID } from './components/Modals/AddDeviceModal'
import { UpdateDeviceModal, UPDATE_DEVICE_MODAL_ID } from './components/Modals/UpdateDeviceModal'
import { DeleteDeviceModal, DELETE_DEVICE_MODAL_ID } from './components/Modals/DeleteDeviceModal'
import { Device } from './types/device'
import Button from './components/UILibrary/Button'

function App() {
  const { data, isLoading, error } = useQuery<Device[]>({
      queryKey: ['devices'],
      queryFn: async () => {
        const response = await fetch('http://localhost:3000/devices')
        return response.json()
      },
    })
  const { onOpen: openAddDeviceModal, isOpen: isAddDeviceModalOpen, onClose: closeAddDeviceModal } = useModal(ADD_DEVICE_MODAL_ID)
  const { data: updateDevice, onOpen: openUpdateDeviceModal, isOpen: isUpdateDeviceModalOpen, onClose: closeUpdateDeviceModal } = useModal(UPDATE_DEVICE_MODAL_ID)
  const { data: deleteDevice, onOpen: openDeleteDeviceModal, isOpen: isDeleteDeviceModalOpen, onClose: closeDeleteDeviceModal } = useModal(DELETE_DEVICE_MODAL_ID)

  return (
    <>
      <Header />
      <div className="flex flex-col items-start flex-1 w-full p-4">
        <div className="flex flex-row justify-between items-center w-full pb-4">
          <p className="text-xl font-medium">Devices</p>
          <Button aria-label="Add device" variant="primary" onClick={openAddDeviceModal}>
            <PlusIcon className="fill-white h-3.5" />
            <p className="ml-2">Add device</p>
          </Button>
        </div>
        <DeviceList data={data} isLoading={isLoading} error={error} openUpdateDeviceModal={openUpdateDeviceModal} openDeleteDeviceModal={openDeleteDeviceModal} />
      </div>
      {isAddDeviceModalOpen && <AddDeviceModal isOpen={isAddDeviceModalOpen} onClose={closeAddDeviceModal} />}
      {isUpdateDeviceModalOpen && <UpdateDeviceModal device={updateDevice} isOpen={isUpdateDeviceModalOpen} onClose={closeUpdateDeviceModal} />}
      {isDeleteDeviceModalOpen && <DeleteDeviceModal device={deleteDevice} isOpen={isDeleteDeviceModalOpen} onClose={closeDeleteDeviceModal} />}
    </>
  )
}

export default App
