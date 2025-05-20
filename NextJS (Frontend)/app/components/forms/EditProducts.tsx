'use client'
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

interface EditProductProps {
  product: Product;
}


export default function EditProduct({ product }: EditProductProps) {
  const [category, setCategory] = useState(product.category);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseFloat(formData.get('stock') as string);
  // Get the file from input
  const imageFile = formData.get('image') as File | null;

  let imageUrl = product.image;

  if (imageFile && imageFile.size > 0) {
    const imageData = new FormData();
    imageData.append('file', imageFile);
    imageData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: imageData,
    });

    if (!res.ok) {
      alert("Failed to upload image");
      return;
    }

    const data = await res.json();
    imageUrl = data.secure_url;
  }

    const payload = {
      id: product.id,
      product: {
        name,
        description,
        price,
        category,
        stock,
        image: imageUrl,
      },
    };

    const response = await fetch('/api/organisations/products/update-product', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      window.location.href = '/organisations/management';
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 bg-primary-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">Edit Product</h1>

      <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
        <span className="flex flex-col gap-2">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            required
            defaultValue={product.name}
            className="p-2 rounded-lg"
          />
        </span>

        <span className="flex flex-col gap-2">
          <label>Product Description</label>
          <textarea
            name="description"
            placeholder="Product Description"
            required
            defaultValue={product.description}
            className="p-2 rounded-lg"
          />
        </span>
      </div>

      <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
        <span className="flex flex-col gap-2">
          <label>Product Price</label>
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            required
            defaultValue={product.price}
            className="p-2 rounded-lg"
          />
        </span>

        <span className="flex flex-col gap-2">
          <label>Product Stock</label>
          <input
            type="number"
            name="stock"
            placeholder="Product Stock"
            required
            defaultValue={product.stock}
            className="p-2 rounded-lg"
          />
        </span>

        <span className="flex flex-col gap-2">
          <label>Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="p-2 rounded-lg"
          >
            <option value="" disabled>Select a category</option>
            <option value="Electronics & Computing">Electronics & Computing</option>
            <option value="Clothing & Shoes">Clothing & Shoes</option>
            <option value="Home, Garden & DIY">Home, Garden & DIY</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Books, Films & Music">Books, Films & Music</option>
            <option value="Sport & Activity">Sport & Activity</option>
            <option value="Stationary & Craft Supplies">Stationary & Craft Supplies</option>
            <option value="Art & Collectables">Art & Collectables</option>
            <option value="Pet Supplies">Pet Supplies</option>
            <option value="Toys & Games">Toys & Games</option>
          </select>
        </span>
      </div>

      <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
        <span className="flex flex-col gap-2">
          <label>Product Image</label>
          <input type="file" name="image" accept=".jpg, .jpeg, .png, .gif" className="p-2 rounded-lg" />
        </span>
      </div>

      <button
        type="submit"
        className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400"
      >
        Edit Product
      </button>
    </form>
  );
}