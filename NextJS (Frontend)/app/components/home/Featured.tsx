import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Image from "next/image";

export default function Featured() {

    return (
        <div className="w-full flex justify-center my-4 py-4 bg-primary-200 rounded-xl relative overflow-hidden">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl text-gray-700 hover:text-gray-900 z-10">
                <IoIosArrowBack />
            </div>

            <div className="relative w-full mx-20 h-[300px] overflow-hidden">
                    <Image
                        src="/advert.png"
                        alt="Featured"
                        width={2000}
                        height={900}
                        className="object-cover rounded-lg shadow-xl absolute inset-0 w-full h-full"
                    />
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl text-gray-700 hover:text-gray-900 z-10">
                <IoIosArrowForward />
            </div>
        </div>
    );
}
