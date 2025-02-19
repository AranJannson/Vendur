// import MotionWrapper from "@/app/components/animation/MotionWrapper";
import Hero from "@/app/components/home/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 overflow-hidden">
        <Hero />

        <div className="grid grid-cols-2 gap-5">

            <div className="width-full flex justify-end" id="scroll_target">
                <div className=" bg-accent-900 w-fit h-fit p-5 rounded-2xl">
                    <Image src="https://dummyimage.com/500x500/fcf9fc/000000" alt="temp_image" height="500" width="500"
                           className="rounded-xl"/>
                </div>

            </div>
            <div className="width-full flex justify-start">
                <div className=" bg-accent-900 w-fit h-fit p-5 rounded-2xl">
                    <Image src="https://dummyimage.com/500x500/fcf9fc/000000" alt="temp_image" height="500" width="500"
                           className="rounded-xl"/>
                </div>

            </div>

        </div>
    </div>
  );
}
