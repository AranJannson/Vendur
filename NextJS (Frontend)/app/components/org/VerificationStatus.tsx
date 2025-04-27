'use client'
import VerificationTick from "@/app/components/ui/VerificationTick";
import { useState, useEffect } from 'react';
import Modal from '@/app/components/org/OrgVerificationFormModal';
import VerificationRequestForm from '@/app/components/forms/VerificationRequestForm';

interface VerificationStatusProps {
    id: string;
  }

const VerificationStatus: React.FC<VerificationStatusProps> = ({ id }) => {

    const [checkIfVerified, setCheckIfVerified] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleVerificationRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        alert('Verification request sent!');
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
        const fetchData = async () => {
          try {
            console.log("ID: " + id);
            const res = await fetch('/api/organisations/verification/check', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
              });  
                const data = await res.json();
                setCheckIfVerified(data.verified);

          } catch (error) {
            console.error("Error fetching data:", error);
            setCheckIfVerified(false);
            }
        };

        useEffect(() => {
            fetchData();
        }, [id]); //Live update

    return (
        <div className="bg-primary-100 shadow-xl rounded-xl p-4 h-fit">
            <h1 className="font-bold text-xl mb-2">Verification Status</h1>
            {checkIfVerified === null ? (
                <p>Loading...</p>
            ) : checkIfVerified ? (
                <VerificationTick />
            ) : (
                <div>
                    <p className="text-red-500 font-medium">Not Verified</p>
                    <div className="flex flex-col gap-2">
                        <button onClick={openModal} className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">Request Verification</button>
                    </div>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <VerificationRequestForm id={id}/>
            </Modal>
            
        </div>
    );
};
export default VerificationStatus;
