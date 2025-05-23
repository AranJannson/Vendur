"use client";
import { useUser } from "@stackframe/stack"
import {useEffect, useState} from "react";
import Link from "next/link";

interface Order {
    id: number;
    created_at: string;
    item_id: number | null;
    quantity: number | null;
    familyFriendly: number | null;
    group_id: number | null;
    status: string;
    item: Item | null;
}

interface DeliveryAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
}

interface Item {
    id: number;
    name: string;
    image: string;
    category: string;
    description: string;
    discount: number;
    rating: number;
    price: number;
    org_id: string;
}


interface OrderGroup {
    id: number;
    user_id: string;
    ordered_at: string;
    delivery_address: DeliveryAddress;
    full_name: string;
    total_cost: number;
    orders: Order[];
    status: string;
}

export default function UserOrdersPage(){
    const user =  useUser({ or: 'redirect' });

    const userId = user?.id;

    const [orderGroups, setOrderGroups] = useState<OrderGroup[] | null>(null);


    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) return;

            try {
                const response = await fetch("http://localhost:3000//api/getAllUserOrders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id: user.id }),
                });

                const json = await response.json();
                const groups = json.orderDetails;

                const groupsWithItemDetails = await Promise.all(
                    groups.map(async (group: OrderGroup) => {
                        const itemDetailOrders = await Promise.all(
                            group.orders.map(async (order: Order) => {
                                const itemResponse = await fetch("http://localhost:3000/api/getItemByID", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ id: order.item_id }),
                                });

                                const item: Item = await itemResponse.json();
                                return { ...order, item };
                            })
                        );
                        return { ...group, orders: itemDetailOrders };
                    })
                );

                const reversedGroups = groupsWithItemDetails.reverse();

                setOrderGroups(reversedGroups);
            } catch (error) {
                console.error("Failed to fetch enriched orders:", error);
                setOrderGroups([]);
            } finally {

            }
        };

        fetchOrders();
    }, [userId]);


    return(

        <div className="p-4 text-center">

            <title>My Orders | Vendur</title>

            <h1 className="text-3xl font-bold mb-4">My Orders</h1>

            {orderGroups?.map((group) => (
                <div key={group.id} className="border p-2 m-4 rounded-lg bg-primary-300">
                    <div className="bg-background-100 m-4 p-2 rounded-lg flex flex-row gap-5">
                        <div className="flex flex-col gap-3">
                            <div>
                                <h2 className="text-xl font-semibold text-left pl-4">Order Number: {group.id}</h2>
                                <h2 className="text-lg font-semibold text-left pl-4">Ordered At: {new Date(group.ordered_at).toLocaleString()}</h2>
                            </div>
                            <div className="flex flex-row gap-2 pl-4">
                                <h2 className="font-bold">Order Status:</h2>
                                <h2>{group.status}</h2>
                            </div>
                            <div className="flex flex-row gap-2 pl-4">
                                <h2 className="font-bold">Total Cost:</h2>
                                <h2>£{group.total_cost}</h2>
                            </div>
                        </div>

                        <div className="pl-4 text-left">
                            <h2 className="text-lg font-semibold mb-2">Delivery Address:</h2>
                            <p className="text-base font-medium mt-2">
                                {group.full_name}
                            </p>
                            <p className="text-base">{group.delivery_address.line1}</p>
                            {group.delivery_address.line2 && (
                                <p className="text-base">{group.delivery_address.line2}</p>
                            )}
                            <p className="text-base">
                                {group.delivery_address.city}, {group.delivery_address.state}
                            </p>
                            <p className="text-base">
                                {group.delivery_address.country} - {group.delivery_address.postal_code}
                            </p>
                        </div>


                    </div>

                    <ul className="mt-2 flex flex-row gap-4 bg-background-200 p-4 rounded-lg overflow-x-auto w-full">
                        {group.orders?.map((order) => (
                            <li key={order.id} className="min-w-[250px] scale-90">
                                <div className="grid grid-cols-1 bg-background-100 rounded-lg p-4 gap-4 justify-center items-center">

                                    <Link href={`/products/${encodeURIComponent(order.item!.name)}`} className="bg-primary-300 w-[150px] h-[150px] rounded-lg flex items-center justify-center overflow-hidden mx-auto">
                                        <img src={order.item?.image} alt="Order Item" className="object-contain w-full h-full" />
                                    </Link>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex flex-row gap-2">
                                            <h2 className="font-bold">Item Order Number:</h2>
                                            <h2>{order.id}</h2>
                                        </div>

                                        <div className="flex flex-row gap-2">
                                            <h2 className="font-bold">Order Item:</h2>
                                            <h2>{order.item?.name}</h2>
                                        </div>

                                        <div className="flex flex-row gap-2">
                                            <h2 className="font-bold">Order Status:</h2>
                                            <h2>{order.status}</h2>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>

                </div>
            ))}

        </div>

    );
}