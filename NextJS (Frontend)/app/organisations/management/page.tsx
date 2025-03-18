import Link from "next/link"
import Image from "next/image"

export default function OrganisationsManagement() {

    return(

        <>

            <div className="grid grid-cols-3 h-full w-full m-4 gap-8 max-w-[97vw]">

                <div className="flex flex-col gap-8">

                    <Link href="#" className="w-full h-[10vh] bg-primary-200 rounded-lg shadow-xl transition-colors hover:bg-primary-300 text-center flex items-center justify-center font-bold text-2xl">
                        Manage Listings
                    </Link>

                    <div className="w-full aspect-square max-h-fit bg-primary-200 rounded-lg shadow-xl grid grid-cols-2 gap-4 p-4">

                        <Image src="https://dummyimage.com/400x400/fff/000" alt="Temp" width="200" height="150" className="rounded-xl"/>

                        <Image src="https://dummyimage.com/400x400/fff/000" alt="Temp" width="200" height="150" className="rounded-xl"/>

                        <Image src="https://dummyimage.com/400x400/fff/000" alt="Temp" width="200" height="150" className="rounded-xl"/>

                        <Image src="https://dummyimage.com/400x400/fff/000" alt="Temp" width="200" height="150" className="rounded-xl"/>
                    </div>


                </div>

                <div className="col-span-2">

                    <div className="w-full h-[70.5vh] bg-primary-200 rounded-lg shadow-xl">


                    </div>

                </div>

                <div className="w-full h-20 bg-primary-200 rounded-lg shadow-xl col-span-3">

                </div>

            </div>

        </>

    );
}

// https://dummyimage.com/600x400/000/fff