'use client'
import VerificationTick from "@/app/components/ui/VerificationTick";

const checkIfVerified = 0; // Replace with actual verification check

export default function VerificationStatus() {


    const handleVerificationRequest = async () => {
        alert("Verification request sent");
    }

    return (
        <div className="bg-primary-100 shadow-xl rounded-xl p-4 h-fit">
            <h1 className="font-bold text-xl mb-2">Verification Status</h1>

            {checkIfVerified ? (
                <VerificationTick />
            ) : (
                <div className="flex flex-col gap-2">

                    <p className="text-red-500 font-medium">Not Verified</p>

                    <button onClick={handleVerificationRequest} className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">Request Verification</button>

                </div>


            )}
        </div>
    );
}
