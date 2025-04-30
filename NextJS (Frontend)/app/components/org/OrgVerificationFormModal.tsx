import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg max-h-screen w-full max-w-3xl overflow-y-auto p-6">
                <div className="flex justify-end">
                    <button onClick={onClose} className="text-gray-500">Close X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;