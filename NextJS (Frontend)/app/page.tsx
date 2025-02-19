import NavBar from "@/app/components/home/NavBar";
import Featured from "@/app/components/home/Featured";
import HeroProduct from "@/app/components/home/HeroProduct";

export default function Home() {

    return (
        <div className="flex flex-col gap-5 overflow-hidden bg-background-100">
            <div className="flex flex-col">
                <div className="w-screen py-4 bg-accent-200 grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center content-center md:px-0 px-4">
                    <HeroProduct url="https://dummyimage.com/500x350/fff/000.png" text="Temp1" />
                    <HeroProduct url="https://dummyimage.com/500x350/fff/000.png" text="Temp2" />
                    <HeroProduct url="https://dummyimage.com/500x350/fff/000.png" text="Temp3" />
                </div>
                <NavBar />
                <Featured />
            </div>
        </div>
    );
}
