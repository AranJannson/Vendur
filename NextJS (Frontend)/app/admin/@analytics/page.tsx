import Image from "next/image";
import PageClickViewer from "@/app/components/displays/PageClickViewer";
import AdminAnalytics from "@/app/components/admin/Analytics";

export default function Analytics() {
    return (
        <div className="h-fit bg-secondary-400 m-4 rounded-xl shadow-xl p-4">
            <div className="text-3xl font-bold pb-4 text-center">
                Analytics
            </div>
            <div className="p-4">

                <PageClickViewer/>

            </div>

            <div className="p-4">
                <AdminAnalytics/>
            </div>


            <div className="flex flex-row gap-6 overflow-x-scroll">


                <Image src={"https://dummyimage.com/200x200/fff/000000"} alt={"Temp"} width={200} height={200} className="rounded-lg"/>

                <Image src={"https://dummyimage.com/200x200/fff/000000"} alt={"Temp"} width={200} height={200} className="rounded-lg"/>

                <Image src={"https://dummyimage.com/200x200/fff/000000"} alt={"Temp"} width={200} height={200} className="rounded-lg"/>

                <Image src={"https://dummyimage.com/200x200/fff/000000"} alt={"Temp"} width={200} height={200} className="rounded-lg"/>

                <Image src={"https://dummyimage.com/200x200/fff/000000"} alt={"Temp"} width={200} height={200} className="rounded-lg"/>

                <Image src={"https://dummyimage.com/200x200/fff/000000"} alt={"Temp"} width={200} height={200} className="rounded-lg"/>

            </div>
        </div>

    )
}