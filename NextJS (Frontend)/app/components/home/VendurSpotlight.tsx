import ShopCard from "@/app/components/org/ShopCard"

const shops = [
    { name: "The Book Store", link: "/organisations/the-book-store" },
    { name: "The Toy Store", link: "/organisations/the-toy-store" },
    { name: "Shoe Shop", link: "/organisations/shoe-shop" },
  ];

export default function VendurSpotlight() {

    return(
        <>
            <div className="flex flex-col h-fit items-center justify-center content-center md:flex-row bg-background-100 p-4 md:p-8 rounded-lg shadow-2xl m-4 w-[90%] mx-auto">

                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 w-[50rem]">
                        <h1 className="text-3xl font-bold text-gray-800">Vendur Spotlight</h1>
                        <p className="text-gray-600 w-44">Get to know the best vendurs in the market</p>
                        <button className="bg-primary-300 font-bold px-4 py-2 rounded-lg mt-4 transition-colors hover:bg-primary-400">View All Vendurs</button>
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-1 h-fit ">
                        
                    {shops.map((shop, index) => (
                        <ShopCard key={index} name={shop.name} link={shop.link} />
                    ))}
                    </div>
            </div> 
        </>
    );
}
