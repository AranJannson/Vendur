import Link from "next/link";

export default async function ShopPage({ params }: { params: { shop: string } }) {
    const shop = decodeURIComponent(params.shop);

    const orgDet = await fetch('http://localhost:8003/getOrgByName', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: shop }),
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

                <div className="w-full h-64 bg-primary-500 flex items-center justify-center flex-col gap-6 border-b-2 border-black">
                    <h1 className="text-6xl font-bold">{shop}</h1>
                    <p>{data.description}</p>
                </div>

                <div className="p-4 rounded-lg">
                    <input className="bg-background-300 p-4 rounded-lg shadow-md flex flex-row gap-4 placeholder:text-gray-700 w-full" placeholder="Search..."/>
                </div>

                <div className="grid grid-cols-1 gap-4 bg-secondary-100">

                    <div className="w-full flex justify-center gap-4">
                        <h2 className="text-4xl font-bold">Products</h2>
                    </div>
                         <ul className="mt-4 flex md:flex-row flex-col items-center justify-center gap-4 w-full overflow-x-scroll pb-4">
                             {items.map((item: { name: string; id: string, image: string, price: number }) => (
                                <div key={item.id} className="bg-primary-300 min-h-96 max-h-96 rounded-xl shadow-xl size-64 p-4 grid grid-cols-1 gap-2">
                                    <div className="bg-primary-200 rounded-lg m-2">
                                        <img src={item.image}
                                             alt={item.name}
                                             width={400}
                                             height={400}
                                             className="aspect-square object-contain"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold">{item.name}</h2>
                                        <p>Price £{item.price}</p>

                                    </div>
                                    <div>
                                        <Link  href={`/products/${encodeURIComponent(item.name)}`} className="bg-secondary-400 h-fit text-center p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-500">
                                            Purchase
                                        </Link>
                                    </div>


                                </div>
                            ))}
                        </ul>


                </div>

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
        // <div className="p-4">
        //     <h1 className="text-lg font-bold">{shop}</h1>
        //     <p>Welcome to: {shop}</p>
        //

        // </div>
    );
}
