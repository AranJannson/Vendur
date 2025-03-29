import StarRating from "@/app/components/product/StarRating";
import ProductList from "@/app//products/productList";

export const metadata = {
    title: "Products | Vendur",
    description: "",
};


interface Item {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    discount: number;
    org_id: number;
}

export default async function Products() {

    const response = await fetch('http://localhost:8000/getItems', {
        method: 'GET',
    });

    const items = await response.json();

    const productsWithRatings = await Promise.all(
        items.map(async (item: Item) => {

            const response = await fetch('http://localhost:8000/checkIfItemHasReview', {
                method: 'POST',
                body: JSON.stringify({ item_id: item.id }),
            });

            const ratings = response;

            if (!ratings) {//No rating
                console.error("Error fetching rating");
                return { ...item, rating: 0 };
            }
            
            
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const rating = ratings[0]?.rating ?? 0;
            return { ...item, rating };
        })
    );

    return (

        <div className="bg-background-100 w-full p-4">
            <ProductList items={productsWithRatings || [] } />
        </div>
    );
}
