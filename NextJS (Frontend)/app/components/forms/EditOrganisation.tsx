'use client';
import Link from "next/link";
import React, { useEffect, useState } from 'react';

interface Organisation {
    id: string;
    name: string;
    description: string;
    email: string;
    telephone: string;
    website: string;
    address: string;
    shipping_type: string;
    product_type: string;
    is_verified: boolean;
    active: boolean;
    created_at: string;
}

type Props = {
    id: string;
  };

async function getOrganisation(id: string) {
    const res = await fetch('/api/admin/orgDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
      cache: 'no-store'
    });
    return res.json() as Promise<Organisation>;
  }

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const id = formData.get('id');
    const name = formData.get('name');
    const email = formData.get('email');
    const description = formData.get('description');
    const telephone = formData.get('telephone');
    const website = formData.get('website');
    const address = formData.get('address');
    const product_type = formData.get('product_type');
    const shipping_type = formData.get('shipping_type');
    const active = formData.get('active');
    const is_verified = formData.get('is_verified');

    const payload = {
        id,
        name,
        description,
        email,
        telephone,
        website,
        address,
        product_type,
        shipping_type,
        active,
        is_verified
    };
    
    const response = await fetch('/api/admin/orgEdit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        const con = window.confirm('Successfully updated organisation.');
        if (con) {
         window.location.href = '/admin';
        }
      } else {
        alert('Failed to update organisation.');
      }
  };
 
const FormClientComponent: React.FC<Props> = ({ id }) => {
    const [org, setOrg] = useState<Organisation | null>(null);

    useEffect(() => {
        const fetchOrg = async () => {
          try {
            const org = await getOrganisation(id);
            setOrg(org);
          } catch (error) {
            console.error('Error fetching organization:', error);
          }
        };
    
        fetchOrg();
      }, [id]);

      if (!org) {
        return <div>-</div>;
      }

    return (
    <div className="p-6 max-w mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold">Edit Details</h2>
      <form onSubmit={onSubmit} method="PUT" className="space-y-4">
        <input type="hidden" name="id" value={org?.id} />
        <div>
          <label htmlFor="name" className="block font-bold">Organisation Name</label>
          <input type="text" id="name" name="name" defaultValue={org.name} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="description" className="block font-bold">Description</label>
          <input type="text" id="description" name="description" defaultValue={org.description} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="email" className="block font-bold">Email</label>
          <input type="email" id="email" name="email" defaultValue={org.email} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="telephone" className="block font-bold">Telephone Number</label>
          <input type="tel" id="telephone" name="telephone" defaultValue={org.telephone} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="website" className="block font-bold">Website</label>
          <input type="url" id="website" name="website" defaultValue={org.website} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="address" className="block font-bold">Address</label>
          <input type="text" id="address" name="address" defaultValue={org.address} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="address" className="block font-bold">Product Type</label>
          <input type="text" id="product_type" name="product_type" defaultValue={org.product_type} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="address" className="block font-bold">Shipping Type</label>
          <input type="text" id="shipping_type" name="shipping_type" defaultValue={org.shipping_type} className="w-full px-3 py-2 border border-gray-300 rounded-md" required/>
        </div>

        <div>
          <label htmlFor="active" className="block font-bold">Org Active Status</label>
          <p className="text-sm text-gray-600 mb-1">Set to false to unlist the shop</p>
          <select id="active" name="active" defaultValue={org.active.toString()} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option disabled>
              Current: {org.active ? "true" : "false"}
            </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div>
          <label htmlFor="is_verified" className="block font-bold">Org Verification Status</label>
          <select id="is_verified" name="is_verified" defaultValue={org.is_verified.toString()} className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
            <option disabled>
              Current: {org.is_verified ? "true" : "false"}
            </option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-3"> Save Changes </button>
        <Link href="/admin"><button type="button"className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-700">Cancel</button></Link>
      </form>
    </div>
    );
}
export default FormClientComponent;