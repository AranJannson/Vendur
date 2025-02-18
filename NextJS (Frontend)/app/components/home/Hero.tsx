import MotionWrapper from "@/app/components/animation/MotionWrapper";
import NavButton from "@/app/components/ui/NavButton";
import BouncingArrow from "@/app/components/ui/BouncingArrow";


export default function Hero() {
    return (
        <div className="bg-background-main h-screen w-screen">
            <div className="grid md:grid-cols-2 grid-cols-1 h-full relative">
                <div className="m-40 z-50">
                    <h1 className="text-5xl text-text-100 font-bold">
                        Welcome to{" "}
                        <MotionWrapper>
                            <p className="text-accent-400">Vendur</p>
                        </MotionWrapper>
                    </h1>
                    <p className="text-text-200">The best clothing vendor around</p>
                    <div className="z-50">
                        <NavButton title="View Our Catalog" href="/"/>
                    </div>
                    <div className="flex flex-col w-full h-full justify-center items-center">
                        <BouncingArrow/>
                    </div>


                </div>
                <svg
                    preserveAspectRatio="none"
                    viewBox="0 0 1000 100"
                    className="absolute z-20 top-0 left-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <polygon fill="#7426ed" points="0,87 1000,87 1000,100 0,100"/>
                    <polygon fill="#5d1ebe" points="0,89 1000,89 1000,100 0,100"/>
                    <polygon fill="#20024e" points="0,91 1000,91 1000,100 0,100"/>
                </svg>

                <div className="relative overflow-hidden">
                    <svg
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        className="absolute top-0 left-0 w-full h-full z-30"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <polygon fill="#20024e" points="29,0 100,0 100,140 4,91"/>


                    </svg>
                    <svg
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        className="absolute top-0 left-0 w-full h-full z-20"
                        xmlns="http://www.w3.org/2000/svg"
                    >

                        <polygon fill="#5d1ebe" points="27,0 100,0 100,90 2,90"/>

                    </svg>
                    <svg
                        preserveAspectRatio="none"
                        viewBox="0 0 100 100"
                        className="absolute top-0 left-0 w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polygon fill="#7426ed" points="25,0 100,0 100,90 0,90"/>
                        <polygon fill="#5d1ebe" points="27,0 100,0 100,90 2,90"/>
                        <polygon fill="#20024e" points="29,0 100,0 100,90 4,90"/>

                    </svg>
                </div>
            </div>

            <div className="w-full bg-gradient-to-b from-[#20024e] to-[#040317] h-96"></div>
        </div>
    );
}
