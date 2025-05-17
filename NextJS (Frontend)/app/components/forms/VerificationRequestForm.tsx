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
        const image_document_file = formData.get('documents') as File;
        const image_thumbnail_file = formData.get('thumbnail') as File;

        if (!image_document_file || image_document_file.size === 0) {
            alert("Please upload a document image.");
            return;
        }

        if (!image_thumbnail_file || image_thumbnail_file.size === 0) {
            alert("Please upload a thumbnail image.");
            return;
        }

        //Image Uploads
        const imageData_document = new FormData();
        const imageData_thumbnail = new FormData();
        imageData_document.append('file', image_document_file);
        imageData_thumbnail.append('file', image_thumbnail_file);
        imageData_document.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        // https://cloudinary.com/documentation/image_upload_api_reference
        const res_doc = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: imageData_document,
        });

        const data_doc = await res_doc.json();
        const document_imageUrl = data_doc.secure_url;

        if (!document_imageUrl) {
            alert("Failed to upload image (Documentation)");
            return;
        }

        imageData_thumbnail.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res_thu = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
            method: 'POST',
            body: imageData_thumbnail,
        });

        const data = await res_thu.json();
        const thumbnail_imageUrl = data.secure_url;

        if (!document_imageUrl) {
            alert("Failed to upload image (Thumbnail)");
            return;
        }

        const payload = {
            product : {
                org_id: id,
                name,
                description,
                email,
                productInfo,
                shippingMethod,
                image_document: document_imageUrl,
                image_thumbnail: thumbnail_imageUrl,
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
        return <p>Failed loading organisation data. Refresh and try again.</p>;
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-3 p-4 bg-primary-100 rounded-lg shadow-md">
            <h1 className="text-xl font-bold">Organisation Verification</h1>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <span className="flex flex-col gap-1">
                    <label>Organisation Name</label>
                    <input type="text" name="name" placeholder="Org Name" required readOnly value={orgData.name} className="p-2 rounded-lg bg-background-100"/>
                </span>

                <span className="flex flex-col gap-1">
                    <label>Org Description</label>
                    <textarea name="description" placeholder="Org Description" required readOnly value={orgData.description} className="p-2 rounded-lg bg-background-100"/>
                </span>

                <span className="flex flex-col gap-1">
                    <label htmlFor="organisation-email">Organisation Email</label>
                    <input
                        type="email"
                        name="organisationEmail"
                        placeholder="Org Email"
                        required
                        readOnly value={orgData.email}
                        className="p-2 rounded-lg bg-background-100"
                    />
                  </span>
            </div>

            <div className="flex flex-col gap-1 bg-background-200 p-2 rounded-lg bg-background-50">
                  <span className="flex flex-col gap-1">
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

            <div className="flex flex-col gap-1 bg-background-200 p-2 rounded-lg bg-background-50">
                  <span className="flex flex-col gap-1">
                    <label htmlFor="documents">Shop Thumbnail (Upload Section)</label>
                    <input
                        type="file"
                        name="thumbnail"
                        required
                        className="p-2 rounded-lg bg-white"
                        accept=".jpg,.jpeg,.png"
                    />
                    <small className="text-sm text-gray-500">
                      Upload PNG/JPG (Suggested Size: 900x600).
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
