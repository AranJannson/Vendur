'use client';
import { useState } from 'react';
import { FaAngleDown } from "react-icons/fa";

interface Items {
    id: string;
    orderID: number;
    name: string;
    quantity: number;
    status: string;
}

interface DeliveryAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
}

interface ItemsGroup {
    id: string;
    full_name: string;
    total_cost: number;
    delivery_address: DeliveryAddress;
    items: Items[];
    status: string;
}

export default function OrderProcessingItems({ order_group }: { order_group: ItemsGroup[] }) {
    const [openGroup, setOpenGroup] = useState<string | null>(null);

    const toggleDetails = (groupId: string) => {
        setOpenGroup((prev) => (prev === groupId ? null : groupId));
    };

    if (!order_group || order_group.length === 0) {
        return (
            <div className="flex items-center justify-center">
                <div className="flex flex-col gap-4 bg-primary-200 p-8 rounded-lg shadow-xl text-center">
                    <h1 className="text-2xl font-bold ">
                        No Orders Found
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {order_group.map((group) => (
                <div key={group.id} className="bg-primary-200 p-4 rounded-lg shadow-md flex flex-col gap-3 w-full">
                    <div className="grid grid-cols-3 gap-3 items-center w-full">
                        <h2 className="font-bold text-lg">Order ID: {group.id}</h2>

                        <div>
                            <h2 className="font-bold">Status:</h2>
                            <p className="text-green-500">{group.status}</p>
                        </div>
                        <button onClick={() => toggleDetails(group.id)} className="flex justify-end text-2xl">
                            <FaAngleDown className={`transition-all duration-300 w-fit h-fit hover:bg-primary-400 hover:cursor-pointer p-2 rounded-full ${openGroup === group.id ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    {openGroup === group.id && (
                        <div className="flex flex-col gap-3 w-full bg-primary-300 p-4 rounded-lg">

                            <div className="grid grid-cols-2 text-center">
                                <div>
                                    <h2 className="font-bold">Customer:</h2>
                                    <p className="text-gray-700">{group.full_name}</p>
                                </div>
                                <div className="text-sm overflow-x-auto">
                                    <h2 className="font-bold">Delivery Address:</h2>
                                    <p className="text-gray-700">{group.delivery_address.line1}</p>
                                    <p className="text-gray-700">{group.delivery_address.line2}</p>
                                    <p className="text-gray-700">{group.delivery_address.city}</p>
                                    <p className="text-gray-700">{group.delivery_address.state}</p>
                                    <p className="text-gray-700">{group.delivery_address.country}</p>
                                    <p className="text-gray-700">{group.delivery_address.postal_code}</p>
                                </div>

                            </div>

                            {group.items.map((item) => (
                                <div key={item.id} className="bg-primary-100 p-4 rounded-lg">

                                    <span className="flex flex-row gap-3">
                                        <h2 className="font-bold">Item Order ID:</h2>
                                        <p>{item.orderID}</p>
                                    </span>

                                    <div className="flex items-center gap-2 w-full">
                                        <h2 className="font-bold">Item:</h2>
                                        <p className="text-gray-700 flex-1">{item.name} (<b>Qty:</b> {item.quantity})</p>
                                        <form>
                                            <select defaultValue={item.status} className="rounded-lg p-2">
                                                <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option className="bg-red-500" value="Canceled">Canceled</option>
                                            </select>
                                        </form>
                                    </div>
                                </div>

                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
