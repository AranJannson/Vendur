

export const metadata = {
    title: "Organisations | Vendur",
    description: "",
};


interface Org {
    id: string;
    created_at: string;
    name: string;
    description: string;
    email: string;
    telephone: string;
    address: string;
    product_type?: string | null;
    shipping_type?: string | null;
    is_verified: boolean;
    image_document?: string | null;
    image_thumbnail?: string | null;
}

export default async function Organisations() {

    const response = await fetch('http://localhost:3000/api/getAllOrgs', {
        method: 'GET',
        cache: 'no-store',
    });

    const orgs = await response.json();


    return(
        <div className="grid grid-cols-3 gap-8 p-4">

            {orgs.map((org: Org , index: number) => (
                <span key={index} className="rounded-xl shadow-xl bg-secondary-200 p-2">

                    <div className="flex flex-col gap-4">
                        <img src={org.image_thumbnail || "https://dummyimage.com/900x600/fff/000.png"} alt="org_img" width={300} height={200} className="rounded-lg" />

                        <div className="flex flex-col gap-2">
                             <h1 className="text-3xl font-bold">{org.name}</h1>

                            <p className="text-gray-600">{org.description}</p>

                            <div className="flex flex-row gap-4 mt-2">
                                <a href={`/organisations/${org.name}`} className=" px-4 py-2 rounded-lg transition-colors bg-primary-400 hover:bg-primary-300">
                                    View Store
                                </a>
                            </div>
                        </div>



                    </div>

                </span>
            ))}


        </div>
    );
}