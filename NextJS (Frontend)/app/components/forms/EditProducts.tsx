'use client'
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
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
    // TODO Handle image upload

    const payload = {
      id: product.id,
      product: {
        name,
        description,
        price,
        category,
      },
    };

    const response = await fetch('http://localhost:3000/api/organisations/products/update-product', {
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
            <option value="Health & Beauty">Books, Films & Music</option>
            <option value="Health & Beauty">Sport & Activity</option>
            <option value="Health & Beauty">Stationary & Craft Supplies</option>
            <option value="Health & Beauty">Art & Collectables</option>
            <option value="Health & Beauty">Pet Supplies</option>
            <option value="Health & Beauty">Toys & Games</option>
          </select>
        </span>
      </div>

      <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
        <span className="flex flex-col gap-2">
          <label>Product Image</label>
          <input type="file" name="image" accept="image/*" className="p-2 rounded-lg" />
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