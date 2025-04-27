import Link from "next/link"
import Products from "@/app/components/org/Products";
import AddProducts from "@/app/components/forms/AddProducts";
import VerificationStatus from "@/app/components/org/VerificationStatus";
import OrgAnalytics from "@/app/components/org/Analytics";
import { stackServerApp } from "@/stack";
import AddToOrg from "@/app/components/forms/AddToOrg";

export default async function OrganisationsManagement() {
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();

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

                            <VerificationStatus/>

                            <OrgAnalytics/>

                        </div>


                        <AddProducts/>

                    </div>

                </div>

                <div className="w-full h-20 bg-primary-200 rounded-lg shadow-xl col-span-3">
                    {/*<AddToOrg/>*/}
                </div>

            </div>

        </>

    );
}