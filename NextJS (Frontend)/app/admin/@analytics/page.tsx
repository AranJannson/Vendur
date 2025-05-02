import Image from "next/image";
import PageClickViewer from "@/app/components/displays/PageClickViewer";
import OrgsAverageRating from "@/app/components/admin/orgsAverageRatingGraph";
import OrgTotalRevenues from "@/app/components/admin/orgsTotalRevenuesGraph";
import OrgsAvgCategoryItmPrice from "@/app/components/admin/orgsAvgCategoryItemPrice";
import OrgsCategoryNumItemsListed from "@/app/components/admin/orgsCategoryNumItemsListed";
import ReviewsPerDay from "@/app/components/admin/SitewideReviewsPerDay";

export default function Analytics() {
    return (
        <div className="h-fit bg-secondary-400 m-4 rounded-xl shadow-xl p-4">
            <div className="text-3xl font-bold pb-4 text-center">
                Analytics
            </div>
            <div className="p-4">

                <PageClickViewer/>

            </div>
            <div className="text-3xl font-bold pb-4 text-center">
                Analytic Graphs
            </div>
            <div className="w-full h-fit bg-primary-200 rounded-lg shadow-xl col-span-3 grid grid-cols-3">
                <div className="w-[400] h-[400] bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Total Inventory Value of all organisations</h2>
                    <OrgTotalRevenues/>

                </div>
                <div className="w-[400px] h-[400px] bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Average rating for all organisations</h2>
                    <OrgsAverageRating/>

                </div>
                <div className="w-[400px] h-[400px] bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Number of items per category</h2>
                    <OrgsCategoryNumItemsListed/>

                </div>
                <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Average item price per category</h2>
                    <OrgsAvgCategoryItmPrice/>

                </div>
                <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Number of reviews per day</h2>
                    <ReviewsPerDay/>

                </div>
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