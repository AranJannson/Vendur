import Link from 'next/link';
import AddToCheckoutButton from '@/app/components/payment/AddToCheckoutButton';
import ReviewSection from "@/app/components/product/ReviewSection";
import StarRating from "@/app/components/product/StarRating";

interface Item {
    id: number;
    name: string;
    image: string;
    category: string;
    description: string;
    discount: number;
    rating: number;
    price: number;
}

//@ts-ignore
export async function generateMetadata({ params }: { params: { item: string } }) {
    const item = await params.item;
    const decodedItemName = decodeURIComponent(item);

    return {
        title: `${decodedItemName} | Vendur`,
        description: "",
    };
}


export default async function ItemPage({ params }: { params: { item: string } }) {
    const itemName = params.item;
    const decodedItemName = decodeURIComponent(itemName);
    const item_response = await fetch('http://localhost:3000/api/getItems', {
        method: 'GET',
    });

    const items: Item[] = await item_response.json()
    
    const item = items.find((i: any) => i.name === decodedItemName);

    if (!item) {
        return <div>Error loading item: Item not found</div>;
    }
    const reviewsResponse = await fetch('http://localhost:3000/api/review/get-item-reviews?item_id=${item.id}', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const reviews = await reviewsResponse.json();

    if (reviewsResponse.status !== 200) {
        console.error("Error fetching reviews:", reviews);
    }

    const reviewResponse = await fetch('http://localhost:3000/api/review/check-item-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: item.id }),
    });

    const ratings = await reviewResponse.json();
    const rating = Array.isArray(ratings) && ratings.length > 0 ? ratings[0].rating : 0;

    const stockResponse = await fetch(`http://localhost:3000/api/getStock`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_id: item.id }),
    });
    const stock_response = await stockResponse.json();
    console.log(stock_response)
    let stock = 0; //Default
    // if (stockResponse.ok) {
    //     try {
    //         const stockData = await stockResponse.json();
    //         stock = stockData?.quantity ?? 0;
    //     } catch (error) {
    //         console.error("Error parsing stock data:", error);
    //     }
    // } else {
    //     console.error("Error fetching stock:", stockResponse.status, stockResponse.statusText);
    // }

    const availableQuantity = stock;
    const discount = ((item.price * (1 - item.discount / 100)).toFixed(2));
    const percentage_discount = `${item.discount}%`;

    return (
        <div className = "md:w-[70%] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1">
                <div>
                    <div
                        className="bg-secondary-100 aspect-square max-w-[30rem] max-h-[30rem] p-10 m-4 rounded-lg flex justify-center shadow-xl">
                        <img src={item.image} alt={item.name} width="500" height="500" className="object-contain"/>
                    </div>
                </div>

                <div className="m-10 bg-secondary-100 p-5 rounded-lg flex flex-col justify-center shadow-xl">
                    <div className="flex flex-col gap-2">
                        <div>

                            <h1 className="text-3xl font-bold">{item.name}</h1>
                            <i className="text-gray-400">Item ID: {item.id}</i>
                            
                        </div>
                        <StarRating rating={rating}/>

                        {availableQuantity === 0 ? (
                            <p className="text-red-600">Out of Stock</p>
                        ) : (
                            <p className="text-green-600">In Stock</p>
                        )}

                        {item.discount === null || item.discount === 0 ? (
                            <p className="text-2xl font-semibold">£{item.price.toFixed(2)}</p>
                        ) : (
                            
                            <div className="flex flex-row gap-4">
                                <div>
                                <p className="text-2xl flex gap-2">
                                    <span className="text-red-600 font-bold">
                                        £{(discount)}
                                    </span>
                                    
                                </p>
                                <div className="flex flex-row gap-3 justify-center items-center">
                                    <s className="text-sm text-gray-500">£{item.price.toFixed(2)}</s>
                                    <div className="bg-primary-200 p-1 rounded-lg inline-block w-fit">
                                        <p className="text-gray-500 text-sm">{percentage_discount} off</p>
                                    </div>
                                </div>
                                </div>
                                
                                
                                
                            </div> 

                       
                        )}
                        
                        <form className="flex flex-col" id="itemForm">

                            {item?.category === 'Clothing & Shoes' ? (
                                <div className="flex flex-col">
                                    <label className="font-bold ml-1">Size</label>
                                    <select className="p-2 bg-primary-200 rounded-full w-20" name="size">
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>

                            ) : null}

                            <label className="font-bold ml-1">Quantity</label>
                            <input
                                type="number"
                                defaultValue="1"
                                max={availableQuantity < 10 ? availableQuantity : 10}
                                min="1"
                                className="p-2 bg-primary-200 rounded-full w-20"
                                name="quantity"
                            />
                            <div>
                                {availableQuantity === 0 ? (
                                    <button type="submit"
                                            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                                        Notify Me
                                    </button>
                                ) : (
                                    <AddToCheckoutButton 
                                        item={item} 
                                        formId="itemForm"
                                        originalStock={availableQuantity}
                                        />
                                )}
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div className="bg-background-50 shadow-2xl m-4 rounded-lg p-5">
                <h2 className="text-2xl font-bold mb-3">Description</h2>
                <p>Sold by: <Link href = "#" className = "text-text font-bold underline text-text mt-2">Vendur</Link></p>
                <p>{item.description}</p>
            </div>
            {/* Review section */}
            {/* <ReviewSection reviews={reviews} item_id={item.id} /> */}
        </div>
    );
}
