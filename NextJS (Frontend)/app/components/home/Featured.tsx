import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Featured() {

    return (
        <div className="w-full flex justify-center my-4 py-4 bg-primary-200 rounded-xl relative overflow-hidden">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl text-gray-700 hover:text-gray-900 z-10">
                <IoIosArrowBack />
            </div>

            <div className="relative w-full mx-20 h-[300px] overflow-hidden">
                    <img
                        src={"https://media.discordapp.net/attachments/739940713541926986/1347347257737084980/image.png?ex=67cb7e6a&is=67ca2cea&hm=c27cf589b8c539d69f2cb1ef20dcb8611d131cac52b148eb757d0060aed12911&=&format=webp&quality=lossless&width=1872&height=842"}
                        alt="Featured"
                        className="object-cover rounded-lg shadow-xl absolute inset-0 w-full h-full"
                    />
            </div>

            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-4xl text-gray-700 hover:text-gray-900 z-10">
                <IoIosArrowForward />
            </div>
        </div>
    );
}
