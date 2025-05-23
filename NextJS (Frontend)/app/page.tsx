import Featured from "@/app/components/home/Featured";
import OneByFour from "@/app/components/ui/productDisplays/1x4";
import OneByFourCat from "@/app/components/ui/productDisplays/1x4_category";
import CarouselClient from "./components/animation/CarouselClient";
import OneByFourHistory from "./components/ui/productDisplays/1x4_history";
import CategoryDisplay from "./components/ui/productDisplays/category_display";
import VendurSpotlight from "./components/home/VendurSpotlight";
import { stackServerApp } from "@/stack";
export const metadata = {
    title: "Home | Vendur",
    description: "",
};

export const dynamic = 'force-dynamic';

export default async function Home() {
    const user = await  stackServerApp.getUser();
    const user_id = user?.id;
    console.log("[Home] User ID:", user_id);

    return (
        <div className="flex flex-col gap-5 overflow-hidden bg-background-50">
            <div className="flex flex-col">
                <div
                    className="w-full py-4  grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center content-center md:px-0 px-4">

                </div>

                <div className = "user-select: none">
                <CarouselClient category="Electronics & Computing"/>
                </div>
                

                <CategoryDisplay/>       
                {/* <NavBar/> */}

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
                    <VendurSpotlight/>
                </div>

                <div>
                    <OneByFourCat/>
                </div>

                <div>
                    <OneByFourHistory user_id={user_id}/>
                </div>
            </div>
        </div>
    );
}
