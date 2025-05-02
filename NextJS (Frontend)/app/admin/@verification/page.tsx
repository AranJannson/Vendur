'use client';
import { useState, useEffect } from 'react';
import Modal from '@/app/components/admin/VerificationFormModal';
import ViewVerificationRequest from '@/app/components/admin/ViewVerificationRequest';

export default function Verification() {

    interface requestContents {
        id: number;
        org_id: string;
        name: string;
        description: string;
        email: string;
        created_at: string;
        productInfo: string;
        shippingMethod: string;
    }

    const [data, setData] = useState<requestContents[]>([]);
        const fetchData = async () => {
        try {
            const res = await fetch('/api/admin/verificationRequests/getAllRequests');
            if (!res.ok) {
            throw new Error(`Network Error: ${res.statusText}`);
            }
            const data = await res.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        };
    useEffect(() => {
        fetchData();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="aspect-[2/1] rounded-xl shadow-xl bg-primary-300 max-h-96 p-6 flex flex-col">
            <h2 className="font-bold text-2xl">Verification Requests</h2>
            <ul className="flex-1 flex flex-col gap-4 py-4 overflow-y-auto rounded-xl">
                {data.length > 0 ? (
                    data.map((org) => (
                        <li key={org.name} className="grid grid-cols-2 bg-background-500 p-4 rounded-xl w-full">
                            <div className="flex items-center">
                                <h3 className="text-lg font-semibold">Request: {org.id} | {org.name}</h3>
                            </div>
                            <div className="flex justify-end">
                                <button onClick={openModal} className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">View Request</button>
                            <div>
                
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <ViewVerificationRequest id={org.id}/>
                            </Modal>
            
                            </div>
                            </div>
                    
                        </li>
                    ))
                ) : (
                    <li className="flex justify-center items-center bg-background-500 p-4 rounded-xl w-full content-center text-center">
                        <span className="text-lg font-semibold h-60">No verification requests</span>
                    </li>
                )}
            </ul>
        </div>
    );
}