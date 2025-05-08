import Link from "next/link"
import Products from "@/app/components/org/Products";
import AddProducts from "@/app/components/forms/AddProducts";
import VerificationStatus from "@/app/components/org/VerificationStatus";
// import OrgAnalytics from "@/app/components/org/Analytics";
import { stackServerApp } from "@/stack";
// import NewestOrgAnalytics from "@/app/components/org/NewOrgAnalytics";
import OrgAvgPriceCategoryGraph from "@/app/components/org/orgAvgPriceCategoryGraph";
import OrgItemCategoryListedGraph from "@/app/components/org/orgItemsListedCategoryGraph";
import OrgStockValue from "@/app/components/org/orgStockValue";
import OrgAvgRatingGraph from "@/app/components/org/orgAvgReviewGraph";
import OrgDailyReviewsGraph from "@/app/components/org/orgDailyReviewsGraph";
import OrgItemSalesGraph from "@/app/components/org/orgItemSalesGraph";
import OrgItemRevenueGraph from "@/app/components/org/orgItemRevenueGraph";

export const metadata = {
    title: "Org Management | Vendur",
    description: "",
  };

export default async function OrganisationsManagement() {
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();
    const id = allTeams[0]?.id;

    if (allTeams.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col gap-4 bg-primary-200 p-8 rounded-lg shadow-xl text-center">
                    <h1 className="text-2xl font-bold ">
                        Want To Sell Products?
                    </h1>
                    <h1>
                        Create or Join an Organisation
                    </h1>
                    <Link href="/organisations/create" className="bg-secondary-400 rounded-lg p-2 transition-colors hover:bg-secondary-500">
                        Create!
                    </Link>
                </div>
            </div>
        );
    }

    return(
        <>
            <div className="grid grid-cols-3 h-full w-full m-4 gap-8 max-w-[97vw]">

                <div className="flex flex-col gap-8">

                    <h1  className="w-full h-[10vh] bg-primary-200 rounded-lg shadow-xl  text-center flex items-center justify-center font-bold text-2xl">
                        {allTeams[0]?.displayName} - Dashboard
                    </h1>

                    <Products/>

                </div>

                <div className="col-span-2">

                    <div className="w-full h-[82vh] bg-primary-200 rounded-lg shadow-xl p-4 grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-3">

                            <VerificationStatus id={id}/>
                            


                        </div>


                        <AddProducts/>

                    </div>

                </div>
                <div className="w-full h-fit bg-primary-200 rounded-lg shadow-xl col-span-3 grid grid-cols-3 gap-4 mt-8">
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-base font-light p-2">Avg Price Of Product (By Category)</h2>
                        <OrgAvgPriceCategoryGraph/>

                    </div>
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-2xl font-light p-2">Number of Listings (By Category)</h2>
                        <OrgItemCategoryListedGraph/>
                    </div>
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-2xl font-light p-2">Org Stock Value</h2>
                        <OrgStockValue/>
                    </div>
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-2xl font-light p-2">Average Review Rating</h2>
                        <OrgAvgRatingGraph/>
                    </div>
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-2xl font-light p-2">Number of Reviews Per Day</h2>
                        <OrgDailyReviewsGraph/>
                    </div>
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-2xl font-light p-2">Number of Sales Per Item</h2>
                        <OrgItemSalesGraph/>
                    </div>
                    <div className="bg-background-300 m-4 w-fit mx-4 rounded-xl flex flex-col text-center justify-center items-center content-center">
                        <h2 className="text-2xl font-light p-2">Item Revenue</h2>
                        <OrgItemRevenueGraph/>
                    </div>

                </div>

            </div>

        </>

    );
}