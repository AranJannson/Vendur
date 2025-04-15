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

export default async function OneByFourHistory() {
    const response = await fetch('http://localhost:8000/getItems', {
        method: 'GET',
    });

    const items: Item[] = await response.json()

    const electronicsItems = items.filter((item) => item.category === 'Electronics & Computing');
    


    const categories = [
        { name: 'Electronics & Computing', items: electronicsItems },
    ];

    return (
        <div className="bg-background-50 m-4 rounded-lg max-w-screen">
            <div className="bg-background-50 p-4 rounded-t-xl rounded-b-xl">
                
            </div>
            
            <div className="grid md:grid-cols-1 grid-cols-1 gap-8 p-4">
            
                {categories.map((category, catIndex) => (
                    <Link href={`/products`} key={catIndex} className="flex flex-col items-center">
                        <div className="grid grid-cols-8 grid-rows-1 gap-4 bg-secondary-200 p-5 rounded-xl border-2 border-black">
                        <h2 className="text-4xl font-semibold h-full flex justify-center items-center">Continue Browsing</h2>
                            {category.items.slice(0, 8).map((item, itemIndex) => (
                                    <div
                                    key={itemIndex}
                                    className="relative group aspect-square rounded-xl bg-secondary-100 p-2 flex justify-center items-center"
                                    >
                                    <img 
                                        src={item.image}
                                        alt={item.name}
                                        width="150"
                                        height="150"
                                        className="object-contain aspect-square"
                                    />
                                    </div>
                            ))}
                        </div>
                    </Link>
                ))}
        </div>
    </div>
    );
}
