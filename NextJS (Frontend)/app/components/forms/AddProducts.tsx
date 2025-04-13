'use client';
export default function AddProduct(){

    const orgID = 1; // Replace with actual org ID

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const description = formData.get('description');
        const price = formData.get('price');
        const category = formData.get('category');
        const image = formData.get('image');

        const payload = {
            name,
            description,
            price,
            category,
            image,
            org_id: orgID
        }

        const response = await fetch('http://localhost:8000/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert('Product added successfully');
        } else {
            alert('Failed to add product');
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 bg-primary-100 rounded-lg shadow-md">
            <h1 className="text-xl font-bold">Add Product</h1>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <span className="flex flex-col gap-2">
                    <label>Product Name</label>
                    <input type="text" name="name" placeholder="Product Name" required className="p-2 rounded-lg"/>
                </span>

                <span className="flex flex-col gap-2">
                    <label>Product Description</label>
                    <textarea name="description" placeholder="Product Description" required className="p-2 rounded-lg"/>
                </span>
            </div>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <span className="flex flex-col gap-2">
                    <label>Product Price</label>
                    <input type="number" name="price" placeholder="Product Price" required className="p-2 rounded-lg"/>
                </span>

                <span className="flex flex-col gap-2">
                    <label>Product Category</label>

                    <select value="category" name="category" className="p-2 rounded-lg">

                        <option value="Electronics & Computing">Electronics & Computing</option>
                        <option value="Clothing & Shoes">Clothing & Shoes</option>
                        <option value="Home, Garden & DIY">Home & Garden</option>
                        <option value="Health & Beauty">Health & Beauty</option>

                    </select>

                </span>
            </div>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <span className="flex flex-col gap-2">
                    <label>Product Image</label>
                    <input type="file" name="image" accept=".jpg, .jpeg, .png, .gif" required className="p-2 rounded-lg"/>
                </span>
            </div>

            <button type="submit" className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">Add Product</button>
        </form>
    );
}