import EditProducts from "@/app/components/forms/EditProducts";

export default async function EditProductPage({ params }: { params: { item_id: number } }){
    // TODO: Fetch product data from the backend using the item_id
    const product = {
        id: params.item_id,
        name: "Sample Product",
        description: "Sample Description",
        price: 100,
        category: "Sample Category",
    };
    return (
        <>
            <EditProducts product={product}/>
        </>
    );
}