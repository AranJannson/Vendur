import NavBar from "@/app/components/home/NavBar";
import Featured from "@/app/components/home/Featured";
import FourByFour from "@/app/components/ui/productDisplays/4x4";
import OneByFour from "@/app/components/ui/productDisplays/1x4";
import OneByFourCat from "@/app/components/ui/productDisplays/1x4_category";
import CarouselClient from "./components/animation/CarouselClient";

export const metadata = {
    title: "Home | Vendur",
    description: "",
};


export default function Home() {

    return (
        <div className="flex flex-col gap-5 overflow-hidden bg-background-50">
            <div className="flex flex-col">
                <div
                    className="w-full py-4  grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center content-center md:px-0 px-4">
                    {/* <HeroProduct url="https://dummyimage.com/500x350/fff/000.png" text="Temp1"/>
                    <HeroProduct url="https://dummyimage.com/500x350/fff/000.png" text="Temp2"/>
                    <HeroProduct url="https://dummyimage.com/500x350/fff/000.png" text="Temp3"/> */}

                    

                </div>
                <div className = "user-select: none">
                <CarouselClient category="Electronics & Computing"/>
                </div>
                


                <NavBar/>

                <div className="w-full primary-200 h-10"/>
                <div className="bg-background-100">
                    <div className="mx-4">
                        <Featured/>

                    </div>

                    <div>
                        <OneByFour/>
                    </div>

                </div>

                <div>
                    <OneByFourCat/>
                </div>

                <div className="bg-primary-200 m-4 rounded-lg p-2">

                    {/*TODO: List of items last viewed or seasonal*/}

                    {/*<CarouselClient category="Home, Garden & DIY"/>*/}

                </div>
            </div>
        </div>
    );
}
