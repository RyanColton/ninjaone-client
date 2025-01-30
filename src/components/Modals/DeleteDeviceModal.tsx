import { useState } from "react";
import { useDeleteDevice } from "../../apiCalls";
import { Device } from "../../types/device";
import Button from "../UILibrary/Button";
import { Modal } from "../UILibrary/Modal/Modal";

export const DELETE_DEVICE_MODAL_ID = 'delete-device-modal';

interface DeleteDeviceModalProps {
    device: Device;
    onClose: () => void;
    isOpen: boolean;
}

export function DeleteDeviceModal({ device, onClose, isOpen }: DeleteDeviceModalProps) {
    const { mutate: deleteDevice, isPending: isDeletingDevice } = useDeleteDevice();
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = () => {
        deleteDevice(device.id, {
            onSuccess: () => {
                onClose()
            },
            onError: (error) => {
                setError('Error deleting device')
                console.error('Error deleting device:', error)
            }
        })
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete device?"
            footer={
                <>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </>
            }
        >
            {error && <p className="text-red-500">{error}</p>}
            {isDeletingDevice && <p>Deleting device...</p>}
            {!isDeletingDevice && <p>You are about to delete the device {device.system_name}. This action cannot be undone.</p>}
        </Modal>
    )
}