import Image from "next/image";
import MotionWrapper from "@/app/components/animation/MotionWrapper";
import NavButton from "@/app/components/ui/NavButton";

export default function Hero() {

    return(
        <div className="bg-background-main">
            <div className="grid md:grid-cols-2 grid-cols-1 w-[90vw] h-screen m-10 ">
                <div className="m-40">
                    <h1 className="text-5xl text-text-100 font-bold">
                        Welcome to <MotionWrapper><p className="text-accent-400">Vendur</p></MotionWrapper>

                    </h1>

                    <p className="text-text-200">The best clothing vendor around</p>

                    <div>
                        <NavButton title="View Our Catalog" href="\"/>
                    </div>
                </div>
                <div
                    className="absolute top-20 right-0 w-1/2 h-full bg-background-200"
                    style={{clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)'}}
                >
                    <div className="relative w-full h-full flex justify-center items-center">
                        <Image
                            src="https://dummyimage.com/600x300/fcf9fc/000000"
                            alt="Image"
                            width={300}
                            height={300}
                            className="absolute inset-0 m-auto rounded-xl shadow-lg"
                        />
                    </div>
                </div>


                {/*<div className="flex md:justify-end justify-center">*/}
                {/*    <MotionWrapper>*/}
                {/*        /!*<Image src="/HeroImage.svg" alt="Hero Image" width={600} height={600}/>*!/*/}
                {/*        <Image src="/SVG/Artboard 1.svg" alt="Hero Image" width={600} height={600}/>*/}
                {/*    </MotionWrapper>*/}
                {/*</div>*/}
            </div>
            <div className="width-full bg-gradient-to-b from-[#02020d] to-[#040317] h-20">

            </div>
        </div>


    );
}