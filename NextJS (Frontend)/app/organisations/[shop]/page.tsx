import Link from "next/link";
import OneByFourCatByOrg from "@/app/components/ui/productDisplays/1x4_category_org";


export async function generateMetadata({params,}: {params: Promise<{ shop: string }>; }){
    const { shop } = await params;
    const decodedItemName = decodeURIComponent(shop);

    return {
        title: `${decodedItemName} | Vendur`,
        description: "",
    };
}


export default async function ShopPage({params}: { params: Promise<{ shop: string }>; }){
    const { shop } = await params;
    const decodedShop = decodeURIComponent(shop);

    const orgDet = await fetch('http://localhost:8003/getOrgByName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: decodedShop }),
    });

    const data = await orgDet.json();

    const orgId = data.id;


    const response = await fetch('http://localhost:8000/getOrgItems', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgId }),
    });

    if (!response.ok) {
        console.error("Error fetching org items");
        return <div>Failed to load items.</div>;
    }

    const items = await response.json();

    return (

        <>
            <div className="grid grid-cols-1 gap-4 bg-secondary-100">
                <div className="relative w-full h-64 border-b-2 border-black overflow-hidden">
                    <div className="absolute inset-0 bg-background-200" />
                    <div className="relative z-10 flex flex-col gap-6 items-center justify-center h-full text-black">
                        <div className="bg-secondary-300 p-4 rounded-lg shadow-xl text-center">
                            <h1 className="text-6xl font-bold">{decodeURIComponent(shop)}</h1>
                        </div>
                    </div>
                </div>

                {/*<div className="p-4 rounded-lg">*/}
                {/*    <input className="bg-background-300 p-4 rounded-lg shadow-md flex flex-row gap-4 placeholder:text-gray-700 w-full" placeholder="Search..."/>*/}
                {/*</div>*/}

                <div className="grid grid-cols-1 gap-4 bg-secondary-100">

                    <div className="text-center flex flex-col gap-4 bg-primary-300 rounded-xl m-4 p-2">
                        <h2 className="text-4xl font-bold">Description</h2>
                        <div className="bg-primary-400 rounded-lg p-4">
                            <p>{data.description}</p>
                        </div>

                    </div>

                    <div className="w-full flex justify-center gap-4">
                        <h2 className="text-4xl font-bold">Products</h2>
                    </div>
                         <ul className="mt-4 flex md:flex-row flex-col items-center justify-center gap-4 w-full overflow-x-scroll pb-4 px-5">
                             {items.length === 0 ? (
                                 <div className="text-center text-lg font-semibold flex flex-col items-center justify-center">

                                        <p>No items available for this shop.</p>
                                        <Link href="/products" className="mt-4 bg-secondary-400 text-center p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-500">
                                            Explore Products From All Vendurs!
                                        </Link>

                                 </div>
                            ) : (items.map((item: { name: string; id: string, image: string, price: number, discount: number }) => (
                                     <div key={item.id} className="bg-primary-300 rounded-xl shadow-xl w-64 h-[28rem] flex flex-col justify-between p-4">
                                         <div className="bg-primary-200 rounded-lg flex justify-center items-center h-40">
                                             <img
                                                 src={item.image}
                                                 alt={item.name}
                                                 className="object-contain h-full"
                                             />
                                         </div>

                                         <div className="mt-4 flex flex-col gap-1 flex-grow">
                                             <h2 className="text-xl font-semibold">{item.name}</h2>
                                             {item.discount === null || item.discount === 0 ? (
                                                 <p className="font-semibold text-lg">£{item.price.toFixed(2)}</p>
                                             ) : (
                                                 <p className="text-lg">
                                                     <s className="text-gray-500">£{item.price.toFixed(2)}</s>
                                                     <span className="ml-2 text-red-500 font-bold">
                                                        £{(item.price * (1 - item.discount / 100)).toFixed(2)}
                                                     </span>
                                                 </p>
                                             )}
                                         </div>

                                         <Link
                                             href={`/products/${encodeURIComponent(item.name)}`}
                                             className="bg-secondary-400 text-center py-2 font-semibold rounded-xl transition-colors hover:bg-secondary-500"
                                         >
                                             Purchase
                                         </Link>
                                     </div>

                                 ))
                            )}
                        </ul>


                </div>

                {items.length === 0 ? (
                    <div/>
                ): (
                    <div>

                        <OneByFourCatByOrg org_id={orgId} />


                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 bg-secondary-300 rounded-lg m-4 p-4">

                    <div>
                        <h2 className="text-4xl font-bold">Contact</h2>
                    </div>

                    <div>
                        <p className="text-lg font-semibold">Email: {data.email}</p>
                        <p className="text-lg font-semibold">Telephone: {data.telephone}</p>

                    </div>
                    <div>
                        <h2 className="text-xl font-bold">The Business Is Registered At</h2>
                        <p className="text-lg">{data.address}</p>
                    </div>

                </div>

            </div>
        </>
    );
}
