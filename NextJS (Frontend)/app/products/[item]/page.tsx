import { createClient } from '@/utils/supabase/server';
import NavButton from "@/app/components/ui/NavButton";
import Link from 'next/link';

//@ts-ignore
export async function generateMetadata({ params }) {
    const decodedItemName = decodeURIComponent(params.item);
    return {
      title: `${decodedItemName} | Vendur`,
      description: "",
    };
}


export default async function ItemPage({ params }: { params: { item: string } }) {
    const supabase = await createClient();

    const decodedItemName = decodeURIComponent(params.item);

    const { data: item, error } = await supabase
        .from('items')
        .select('*')
        .ilike('name', decodedItemName)
        .maybeSingle();

    if (error || !item) {
        return <div>Error loading item: {error ? error.message : 'Item not found'}</div>;
    }

    const { data: stock, error: stockError } = await supabase
        .from('stock')
        .select('*')
        .eq('item_id', item.id)
        .maybeSingle();

    if (stockError) {
        console.error('Stock error:', stockError);
    }

    const availableQuantity = stock?.quantity || 0;
    const discount = ((item.price * (1 - item.discount / 100)).toFixed(2));
    const percentage_discount = `${item.discount}%`

    return (
        <div className = "md:w-[70%] mx-auto">
            <div className="grid md:grid-cols-2 grid-cols-1">
                <div>
                    <div
                        className="bg-secondary-100 aspect-square max-w-[30rem] max-h-[30rem] p-10 m-4 rounded-lg flex justify-center">
                        <img src={item.image} alt={item.name} width="500" height="500" className="object-contain"/>
                    </div>
                </div>

                <div className="m-10 bg-secondary-100 p-5 rounded-lg flex flex-col justify-center">
                    <div className="flex flex-col gap-2">
                        <div>

                            <h1 className="text-3xl font-bold">{item.name}</h1>
                            <i className="text-gray-400">Item ID: {item.id}</i>
                            
                        </div>
                        

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
                        

                        <form className="flex flex-col">

                            {item?.category === 'Clothing & Shoes' ? (
                                <div className="flex flex-col">
                                    <label className="font-bold ml-1">Size</label>
                                    <select className="p-2 bg-primary-200 rounded-full w-20">
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
                                min="0"
                                className="p-2 bg-primary-200 rounded-full w-20"
                            />
                            <div>
                                {availableQuantity === 0 ? (
                                    <button type="submit"
                                            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                                        Notify Me
                                    </button>
                                ) : (
                                    <button type="submit"
                                            className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                                    Add To Basket
                                    </button>
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

            <div className="bg-secondary-100 m-4 rounded-lg p-5 flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Reviews</h2>

                <div className="grid grid-cols-2 bg-primary-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold">Average Rating: item.rating</h3>
                    <h3 className="text-sm font-semibold">Total Reviews: item.reviewsCount</h3>
                </div>

                <div className="bg-primary-200 rounded-lg p-5">
                    <h2 className="font-bold text-xl mb-3">Add a Review</h2>

                    <form>
                        <div className="flex flex-col">
                            <label htmlFor="review" className="font-bold">Review</label>
                            <textarea
                                name="review"
                                id="review"
                                className="p-2 bg-primary-100 rounded-lg"
                            />
                        </div>

                        <div className="flex flex-col mt-4">
                            <label className="font-bold">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label key={value} className="flex items-center gap-1">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={value}
                                            className="accent-primary-500"
                                        />
                                        {value}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <button type="submit"
                                className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                            Submit
                        </button>
                    </form>

                </div>

                <h2 className="text-2xl font-bold">Recent Reviews</h2>
                <p>{item.reviews ? item.reviews : 'No reviews yet'}</p></div>

        </div>
    );
}
