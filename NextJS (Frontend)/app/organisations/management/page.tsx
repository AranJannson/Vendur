import Link from "next/link"
import Products from "@/app/components/org/Products";
import AddProducts from "@/app/components/forms/AddProducts";
import VerificationStatus from "@/app/components/org/VerificationStatus";
import OrgAnalytics from "@/app/components/org/Analytics";
import { stackServerApp } from "@/stack";

export default async function OrganisationsManagement() {
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();

    return(
        <>
            <div className="grid grid-cols-3 h-full w-full m-4 gap-8 max-w-[97vw]">

                <div className="flex flex-col gap-8">

                    <Link href="#" className="w-full h-[10vh] bg-primary-200 rounded-lg shadow-xl transition-colors hover:bg-primary-300 text-center flex items-center justify-center font-bold text-2xl">
                        Manage Listings
                    </Link>

                    <Products/>

                </div>

                <div className="col-span-2">

                    <div className="w-full h-[82vh] bg-primary-200 rounded-lg shadow-xl p-4 grid grid-cols-2 gap-4">

                        <div className="flex flex-col gap-3">

                            <VerificationStatus/>

                            <OrgAnalytics/>

                        </div>


                        <AddProducts/>

                    </div>

                </div>

                <div className="w-full h-20 bg-primary-200 rounded-lg shadow-xl col-span-3">

                </div>

            </div>

        </>

    );
}