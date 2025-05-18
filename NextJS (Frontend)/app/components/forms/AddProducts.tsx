"use client";
import { useState } from 'react';
import { useUser } from "@stackframe/stack";

export default function AddProducts() {
    const [category, setCategory] = useState("");

    const user = useUser({ or: 'redirect' });
    const allTeams = user.useTeams();

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const description = formData.get('description') as string;
        const price = formData.get('price') as string;
        const imageFile = formData.get('image') as File;

        if (!imageFile || imageFile.size === 0) {
            alert("Please upload an image.");
            return;
        }

        const imageData = new FormData();
        imageData.append('file', imageFile);
        imageData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        // https://cloudinary.com/documentation/image_upload_api_reference
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: imageData,
        });

        const data = await res.json();
        const imageUrl = data.secure_url;

        if (!imageUrl) {
            alert("Failed to upload image");
            return;
        }

        const payload = {
            product: {
                name,
                description,
                price,
                category,
                image: imageUrl,
                org_id: allTeams[0]?.id,
            }
        };

        const response = await fetch('/api/getCreateProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        alert(response.ok ? 'Product added successfully' : 'Failed to add product');
    };


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
                    <select value={category} onChange={(e) => setCategory(e.target.value)} name="category" className="p-2 rounded-lg">
                        <option value="" disabled>Select a category</option>
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
                    <input type="file" name="image" accept=".jpg, .jpeg, .png, .gif" className="p-2 rounded-lg"/>
                </span>
            </div>

            <button type="submit" className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">Add Product</button>
        </form>
    );
}
