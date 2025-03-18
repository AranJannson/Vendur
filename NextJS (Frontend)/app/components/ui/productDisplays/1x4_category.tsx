import { createClient } from '@/utils/supabase/server'
import Link from "next/link";

export default async function OneByFour() {
    const supabase = await createClient();
    const { data: items } = await supabase.from('items').select('*');

    if (!items) {
        return <div>No items found</div>;
    }

    const electronicsItems = items.filter((item) => item.category === 'Electronics & Computing').slice(0, 4);
    
    const clothingItems = items.filter((item) => item.category === 'Clothing & Shoes').slice(0, 4);
    
    const homeItems = items.filter((item) => item.category === 'Home, Garden & DIY').slice(0, 4);
    
    const healthItems = items.filter((item) => item.category === 'Health & Beauty').slice(0, 4);

    const categories = [
        { name: 'Electronics & Computing', items: electronicsItems },
        { name: 'Clothing & Shoes', items: clothingItems },
        { name: 'Home, Garden & DIY', items: homeItems },
        { name: 'Health & Beauty', items: healthItems },
    ];

    return (
        <div className="bg-primary-200 m-4 rounded-lg max-w-screen">
            <div className="bg-primary-300 p-4 rounded-t-xl rounded-b-xl">
                <h2 className="text-3xl font-semibold text-center p-4">Shop our most popular categories</h2>
            </div>
            
            <div className="grid md:grid-cols-4 grid-cols-1 gap-8 p-4">
                {categories.map((category, catIndex) => (
                    <Link href={`/products`} key={catIndex} className="flex flex-col items-center">
                        <h3 className="text-xl font-bold mb-4 text-[25px]">{category.name}</h3>
                        <div className="grid grid-cols-2 grid-rows-2 gap-4 bg-secondary-300 p-5 rounded-xl">
                        {category.items.map((item, itemIndex) => (
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
