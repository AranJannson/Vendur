"use client";
import { useState, useEffect } from 'react';

interface VerificationRequestFormProps {
    id: string;
}

export default function VerificationRequestForm({ id }: VerificationRequestFormProps) {

    interface OrgData {
        name: string;
        email: string;
        description: string;
      }

    const [orgData, setOrgData] = useState<OrgData | null>(null); // We expect OrgData or null
    const [loading, setLoading] = useState(true);

    

    const fetchData = async () => {
        try {
        const res = await fetch('/api/organisations/verification/getOrgInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
            });  
            
            const data: OrgData = await res.json();
            console.log(data)
            if (Array.isArray(data) && data.length > 0) {
                setOrgData(data[0]);
              } else {
                setOrgData(null);
              }

        } catch (error) {
        console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const email = formData.get('organisationEmail');
        const description = formData.get('description');
        const productInfo = formData.get('productInfo');
        const shippingMethod = formData.get('shippingMethod');
        const documents = formData.get('documents');
        const payload = {
            product : {
                org_id: id,
                name,
                description,
                email,
                productInfo,
                shippingMethod,
                //documents
            }
        };
        //to do: change to api
        const response = await fetch('http://localhost:8003/request-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            alert('Failed to send request: Server Error:');
        }
    };

    if (!orgData) {
        return <p>No organisation data available</p>;
      }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 bg-primary-100 rounded-lg shadow-md">
            <h1 className="text-xl font-bold">Organisation Verification</h1>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <span className="flex flex-col gap-2">
                    <label>Organisation Name</label>
                    <input type="text" name="name" placeholder="Org Name" required className="p-2 rounded-lg bg-background-100"/>
                </span>

                <span className="flex flex-col gap-2">
                    <label>Org Description</label>
                    <textarea name="description" placeholder="Org Description" required className="p-2 rounded-lg bg-background-100"/>
                </span>

                <span className="flex flex-col gap-2">
                    <label htmlFor="organisation-email">Organisation Email</label>
                    <input
                        type="email"
                        name="organisationEmail"
                        placeholder="Org Email"
                        required
                        className="p-2 rounded-lg bg-background-100"
                    />
                  </span>
            </div>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg bg-background-50">
                  <span className="flex flex-col gap-2">
                    <label htmlFor="documents">Documents (Upload Section)</label>
                    <input
                        type="file"
                        name="documents"
                        required
                        className="p-2 rounded-lg bg-white"
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <small className="text-sm text-gray-500">
                      Upload any business registration or ID document (PDF, JPG, or PNG).
                    </small>
                  </span>
            </div>


            

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                  <span className="flex flex-col gap-2">
                    <label htmlFor="product-info">Product Info</label>
                        <select
                            name="productInfo"
                            required
                            className="p-2 rounded-lg bg-background-50"
                            defaultValue=""

                        >
                              <option value="" disabled>Select product type</option>
                              <option value="self-made">Self-made items</option>
                              <option value="third-party">Third-party items</option>
                              <option value="dropshipping">Dropshipping products</option>
                              <option value="digital">Digital products</option>
                              <option value="other">Other</option>
                        </select>
                  </span>
                  <span className="flex flex-col gap-2">
                        <label htmlFor="shipping-method">Shipping Details</label>
                        <select
                            name="shippingMethod"
                            required
                            className="p-2 rounded-lg bg-background-50"
                            defaultValue=""
                        >
                              <option value="" disabled>How will you deliver your products?</option>
                              <option value="courier">Courier</option>
                              <option value="pickup">Pickup</option>
                              <option value="local-delivery">Local Delivery</option>
                              <option value="postal-service">Postal Service</option>
                              <option value="digital-delivery">Digital Delivery</option>
                              <option value="other">Other</option>
                        </select>
                  </span>
            </div>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="agreement"
                        required
                        className="accent-blue-500 w-4 h-4"
                    />
                    I agree to the terms and conditions.
                </label>
            </div>


            <button type="submit" className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">Request Verification</button>
        </form>
    );
}
