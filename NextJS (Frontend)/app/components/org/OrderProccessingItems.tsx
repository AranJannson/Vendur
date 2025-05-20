'use client';
import { useState } from 'react';
import { useEffect } from 'react';
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

async function fetchOrderStatus(orderID: number): Promise<string | null> {
    try {
        const response = await fetch("/api/getOrderStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: orderID }),
        });

        const data = await response.json();
        return data?.status ?? null;
    } catch (error) {
        console.error("Failed to fetch status:", error);
        return null;
    }
}

export default function OrderProcessingItems({ order_group }: { order_group: ItemsGroup[] }) {
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    const [statuses, setStatuses] = useState<{ [orderId: number]: string | null }>({});
    const [groupStatuses, setGroupStatuses] = useState<{ [groupId: string]: string }>({});
    const [loadingItems, setLoadingItems] = useState<{ [orderId: number]: boolean }>({});

    useEffect(() => {
        async function fetchStatusesAndGroupStatuses() {
            const newStatuses: { [orderId: number]: string | null } = {};
            const newGroupStatuses: { [groupId: string]: string } = {};

            // Fetch item status
            const itemStatusPromises = order_group.flatMap((group) =>
                group.items.map(async (item) => {
                    const status = await fetchOrderStatus(item.orderID);
                    newStatuses[item.orderID] = status;
                })
            );

            // Fetch group status
            const groupStatusPromises = order_group.map(async (group) => {
                try {
                    const res = await fetch("/api/getGroupOrderStatus", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: group.id }),
                    });

                    const data = await res.json();
                    newGroupStatuses[group.id] = data.status ?? group.status;
                } catch (error) {
                    console.error(`Failed to fetch status for group ${group.id}`, error);
                    newGroupStatuses[group.id] = group.status;
                }
            });

            await Promise.all([...itemStatusPromises, ...groupStatusPromises]);

            setStatuses(newStatuses);
            setGroupStatuses(newGroupStatuses);
        }

        fetchStatusesAndGroupStatuses();
    }, [order_group]);
    

    const handleStatusChange = async (orderID: number, newStatus: string) => {
          setLoadingItems((prev) => ({ ...prev, [orderID]: true }));
    try {
      const response = await fetch("/api/updateOrderStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderID, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      const data = await response.json();

      setStatuses((prev) => ({ ...prev, [orderID]: newStatus }));

      const group = order_group.find((g) =>
            g.items.some((item) => item.orderID === orderID)
        );

        if (group) {
            const res = await fetch("/api/getGroupOrderStatus", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: group.id }),
            });
            const updatedGroupStatus = await res.json();
            setGroupStatuses((prev) => ({
                ...prev,
                [group.id]: updatedGroupStatus.status,
            }));
        }

      console.log(`Status updated for order ${orderID}:`, data);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoadingItems(prev => ({ ...prev, [orderID]: false }));
  }
  };


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

    const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "completed":
        return "text-green-600";
        case "processing":
        return "text-orange-500";
        case "cancelled":
        return "text-red-600";
        default:
        return "text-gray-700";
        }
    };

    return (
        <div className="flex flex-col gap-3">
            {order_group.map((group) => (
                <div key={group.id} className="bg-primary-200 p-4 rounded-lg shadow-md flex flex-col gap-3 w-full">
                    <div className="grid grid-cols-3 gap-3 items-center w-full">
                        <h2 className="font-bold text-lg">Order ID: {group.id}</h2>

                        <div>
                            <h2 className="font-bold">Status:</h2>
                            <p className={getStatusColor(groupStatuses[group.id] ?? group.status)}>
                                {groupStatuses[group.id] ?? group.status}
                            </p>                        
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
                                    <p className="text-gray-700 flex-1">
                                        {item.name} (<b>Qty:</b> {item.quantity})
                                    </p>

                                    {statuses[item.orderID] === undefined ? (
                                    <p className="text-sm text-gray-500">Loading status...</p>
                                    ) : (
                                    <div className="flex items-center gap-2">
                                        <select
                                        value={statuses[item.orderID] ?? "No Status"}
                                        className="rounded-lg p-2"
                                        onChange={(e) => handleStatusChange(item.orderID, e.target.value)}
                                        disabled={loadingItems[item.orderID]}
                                        >
                                        <option value="Awaiting Confirmation">Awaiting Confirmation</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipping">Shipping</option>
                                        <option className="bg-red-500" value="Cancelled">Cancelled</option>
                                        </select>

                                        {loadingItems[item.orderID] && (
                                        <span className="ml-2 animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500" />
                                        )}
                                    </div>
                                    )}
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
