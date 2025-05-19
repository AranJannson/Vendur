import Link from "next/link";

interface Item {
    id: number;
    name: string;
    image: string;
    category: string;
    discount: number;
    rating: number;
    price: number;
}

export default async function OneByFour() {
    const response = await fetch('/api/getItems', {
        method: 'GET',
    });

    const items: Item[] = await response.json()
    const discountedItems = items.filter(item => item.discount !== null && item.discount > 0);

    return (
        <div className="bg-primary-200 m-4 rounded-lg max-w-screen">
            <h2 className="text-3xl font-semibold text-center p-4">Latest Offers</h2>
            <div className="grid md:grid-cols-4 grid-cols-1 grid-rows-1">
                {discountedItems.slice(0, 4).map((item, index) => (
                    <div
                        key={index}
                        className="relative group aspect-square rounded-xl bg-secondary-100 p-2 m-10 text-center flex justify-center items-center flex-col gap-2"
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                            width="250"
                            height="250"
                            className="aspect-square object-contain"
                        />
                        <Link
                            href={`/products/${item.name}`}
                            className="absolute inset-0 bg-sky-500/90 flex justify-center items-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-500 m-2"
                        >
                            <span className="text-white text-2xl font-bold">
                                {item.name}
                                <br />
                                <span className="ml-2 text-red-500 font-bold">
                                    £{(item.price * (1 - item.discount / 100)).toFixed(2)}
                                </span>
                            </span>
                        </Link>
                        {/* {item.name} */}
                        <h2 className="font-bold text-xl flex flex-col">
                            <span>
                                <p className="font-semibold p-1 bg-red-400 rounded-lg text-sm">Limited Time Deal</p>
                            </span>
                            <br/>
                            <s className="text-gray-500">£{item.price.toFixed(2)}</s>
                            <span className="ml-2 text-red-500 font-bold">
                                £{(item.price * (1 - item.discount / 100)).toFixed(2)}
                            </span>
                        
                        </h2>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
