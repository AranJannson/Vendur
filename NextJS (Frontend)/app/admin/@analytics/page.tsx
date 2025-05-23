import Image from "next/image";
import PageClickViewer from "@/app/components/displays/PageClickViewer";
import OrgsAverageRating from "@/app/components/admin/orgsAverageRatingGraph";
import OrgTotalRevenues from "@/app/components/admin/orgsTotalRevenuesGraph";
import OrgsAvgCategoryItmPrice from "@/app/components/admin/orgsAvgCategoryItemPrice";
import OrgsCategoryNumItemsListed from "@/app/components/admin/orgsCategoryNumItemsListed";
import ReviewsPerDay from "@/app/components/admin/SitewideReviewsPerDay";
import TotalOrders from "@/app/components/admin/TotalOrders"
import TotalRevenue from "@/app/components/admin/TotalRevenue"
import OrdersPerDay from "@/app/components/admin/OrdersPerDay"
import OrderValuePerDay from "@/app/components/admin/OrderValuePerDay"
import OrderAvgValuePerDay from "@/app/components/admin/OrderAvgValuePerDay"

export default function Analytics() {
    return (
        <div className="h-fit bg-secondary-400 m-4 rounded-xl shadow-xl p-4">
            <div className="text-3xl font-bold pb-4 text-center">
                Analytics
            </div>
            <div className="p-4">

                <PageClickViewer/>

            </div>
            <div className="text-3xl font-bold pb-4 text-center flex flex-col">
                Analytic Graphs
            </div>

            <div className="flex flex-row w-full bg-primary-200 rounded-lg shadow-xl col-span 2">
                <div className="bg-background-300 m-4 w-[600] mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Total Orders</h2>
                    <TotalOrders/>

                </div>
                <div className="bg-background-300 m-4 w-[600] mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Total Revenue Ever</h2>
                    <TotalRevenue/>

                </div>
            </div>

            <br className="my-2"/>

            <div className="w-full h-fit bg-primary-200 rounded-lg shadow-xl col-span-2 flex flex-row overflow-x-scroll gap-4">
                <div className="bg-background-300 m-4 mx-4 rounded-xl aspect-square flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Average rating for all organisations</h2>
                    <OrgsAverageRating/>
                </div>
                {/*<div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">*/}
                {/*    <h2 className="text-base font-light p-2">Average rating for all organisations</h2>*/}
                {/*    <OrgsAverageRating/>*/}

                {/*</div>*/}
                <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
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
                <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Order Value Per Day</h2>
                    <OrderValuePerDay/>

                </div>
                <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                    <h2 className="text-base font-light p-2">Average Order Value Per Day</h2>
                    <OrderAvgValuePerDay/>

                </div>
            </div>

        </div>

    )
}