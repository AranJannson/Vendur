import { TiTick } from "react-icons/ti";

export default function VerificationTick() {
    return (
        <span className="flex items-center gap-2 w-fit justify-center bg-primary-400 rounded-xl p-1">
            <div className="bg-primary-500 w-fit h-fit p-1 rounded-full flex justify-center items-center transition-colors hover:bg-primary-600">
                <TiTick size={16} className="text-white"/>
            </div>
            <div className="w-fit text-center flex items-center font-semibold ">
                Verified Partner
            </div>
        </span>
    );
}
