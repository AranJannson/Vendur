import Link from "next/link";
import { GoPlus } from "react-icons/go";
import {stackServerApp} from "@/stack";
import DeleteItemBtn from "@/app/components/org/DeleteItemBtn";
import SearchBar from "@/app/components/org/SearchBar";

interface Item{
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    discount: number;
    org_id: number;
    stock: number;
}

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://vendur.shop';

export default async function Products(){

    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();

    const orgID: string = allTeams[0]?.id;

    const response = await fetch(`${URL}/api/organisations/products/get-products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ org_id: orgID }),
    });

    const items = await response.json();


    return(
        <div className="bg-primary-200 aspect-square rounded-xl shadow-xl grid grid-cols-1 gap-4 p-4 w-full">

            <div className="relative bg-background-300 w-full h-fit text-center rounded-lg p-4 text-xl font-bold flex flex-row justify-center">
                <h1> Products </h1>

                {/* <div className="absolute right-4 top-2 transition-colors hover:cursor-pointer hover:bg-primary-500 justify-center content-center bg-primary-400 h-fit p-3 rounded-full text-2xl items-end ">
                    <GoPlus />
                </div> */}

            </div>

            <div>
                <input  className="bg-background-300 p-4 rounded-lg shadow-md flex flex-row gap-4 placeholder:text-gray-700 w-full" placeholder="Search..."/>
                
            </div>

            <div className="grid grid-cols-1 gap-4 overflow-y-scroll max-h-[50vh] rounded-lg">
                {items.map((item: Item) => (
                    <div key={item.id} className="bg-primary-100 p-4 rounded-lg shadow-md grid grid-cols-4 gap-3">
                        <div className="aspect-square max-h-fit object-contain">
                            <img src={item.image} alt={item.name} width={500} height={500} className="aspect-square object-contain"/>
                        </div>
                        <div className="col-span-2">
                            <h2 className="text-lg font-bold">{item.name}</h2>
                            {/*<p>{item.description}</p>*/}
                            <p>Price: £{item.price}</p>
                            <p>Stock: {item.stock}</p>
                        </div>
                        <div className="flex justify-end">

                            <div className="flex flex-row gap-2">

                                <Link href={`/organisations/management/${item.id}/edit`} className="bg-secondary-300 h-fit w-2/3 text-center p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400">
                                    Edit
                                </Link>

                                <div className="bg-red-500 h-fit w-2/3 text-center p-3 font-semibold rounded-xl transition-colors hover:bg-red-600">
                                    <DeleteItemBtn productId={item.id}/>
                                </div>
                                

                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );

}