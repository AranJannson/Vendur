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

            const reviewResponse = await fetch('http://localhost:8000/checkIfItemHasReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id: item.id }),
            });

            const ratings = await reviewResponse.json();
            const rating = ratings.length > 0 ? ratings[0].rating : 0;

            return { ...item, rating };
        })
    );

    return (

        <div className="bg-background-100 w-full p-4">
            <ProductList items={productsWithRatings || [] } />
        </div>
    );
}
