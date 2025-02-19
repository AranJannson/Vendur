// import MotionWrapper from "@/app/components/animation/MotionWrapper";
import Hero from "@/app/components/home/Hero";
import Image from "next/image";
import NavBar from "@/app/components/home/NavBar";
import Featured from "@/app/components/home/Featured";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 overflow-hidden">
        <div className="flex flex-col">

            <div className="w-screen py-4 bg-accent-1000 grid grid-cols-3 gap-5 items-center justify-center content-center">
                <span className="flex flex-col gap-2 justify-center items-center">
                        <div className="relative w-full md:w-5/6 h-auto aspect-[4/3]">
                            <Image 
                                src="https://dummyimage.com/500x350/fff/000.png" 
                                alt="temp_image" 
                                fill 
                                className="object-cover rounded-lg shadow-xl"
                            />
                        </div>
                    {/* <div className="text-center p-3 bg-background-200 rounded-lg"><button className="w-40">Category 1</button></div> */}
                </span>
                <span className="flex flex-col gap-2 justify-center items-center">
                        <div className="relative w-full md:w-5/6 h-auto aspect-[4/3]">
                            <Image 
                                src="https://dummyimage.com/500x350/fff/000.png" 
                                alt="temp_image" 
                                fill 
                                className="object-cover rounded-lg shadow-xl"
                            />
                        </div>
                    {/* <div className="text-center p-3 bg-background-200 rounded-lg"><button className="w-40">Category 1</button></div> */}
                </span>
                <span className="flex flex-col gap-2 justify-center items-center">
                        <div className="relative w-full md:w-5/6 h-auto aspect-[4/3]">
                            <Image 
                                src="https://dummyimage.com/500x350/fff/000.png" 
                                alt="temp_image" 
                                fill 
                                className="object-cover rounded-lg shadow-xl"
                            />
                        </div>
                    {/* <div className="text-center p-3 bg-background-200 rounded-lg"><button className="w-40">Category 1</button></div> */}
                </span>
            </div>

            <NavBar/>

            <Featured/>
        </div>
    </div>
  );
}
