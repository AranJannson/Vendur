import { stackServerApp } from "@/stack";
import { FaAngleDown } from "react-icons/fa";


export default async function OrderProcessing(){
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();

    const orgID: string = allTeams[0]?.id;

    const response = await fetch('http://localhost:8003/getOrgOrders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgID }),
    });

    // const items = await response.json();t items = await response.json();


    const order_group = ["Test", "Test", "Tes", "gshdg", "jfgh"];

    return (

        <div className="bg-primary-100 shadow-xl rounded-xl p-4 w-full h-[39rem] overflow-y-scroll">
            <h1 className="font-bold text-xl">Orders</h1>
            <div className="flex flex-col gap-3">

                {
                    order_group.map((item: string) => (
                        <div key={item} className="bg-primary-200 p-4 rounded-lg shadow-md grid grid-cols-3 gap-3 w-full ">

                            <h2>Order Number: {item}</h2>


                            <div className="">
                                <h2 className="font-bold">Status:</h2>
                                <p className="text-green-500">Completed</p>
                            </div>

                            <div className="flex justify-end text-2xl">
                                <FaAngleDown  className="transition-colors w-fit h-fit hover:bg-primary-400 hover:cursor-pointer p-2 rounded-full"/>
                            </div>


                            <div className="flex flex-row gap-2 w-full">
                                <h2 className="font-bold">Item:</h2>

                                <div>
                                    <p className="text-gray-700 w-24 px-4">Item 1</p>
                                </div>

                                <div className="flex justify-end items-center content-center">
                                    <form>
                                        <select className="rounded-lg p-2">
                                            <option value="awaiting">Awaiting Confirmation</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option className="bg-red-500" value="canceled">Canceled</option>
                                        </select>
                                    </form>
                                </div>

                            </div>


                        </div>
                    ))
                }




            </div>
        </div>

    );
}