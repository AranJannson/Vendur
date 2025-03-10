import Image from 'next/image';

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
                        
                        <div className="flex flex-col p-2 bg-primary-200 rounded-lg shadow-md m-4 overflow-hidden aspect-3/4 h-fit w-fit">
                            <Image
                                src="/vendur_store_temp.png"
                                alt="Featured"
                                width={100}
                                height={200}
                                className="object-cover w-full h-auto rounded-lg shadow-xl"
                            />
                            <div className="p-2 bg-primary-100 rounded-lg shadow-md m-4 h-32">
                                <h1 className="text-lg font-bold">The Book Store</h1>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                            
                        </div>

                        <div className="flex flex-col p-2 bg-primary-200 rounded-lg shadow-md m-4 overflow-hidden aspect-3/4 h-fit w-fit">
                            <Image
                                src="/vendur_store_temp_2.png"
                                alt="Featured"
                                width={100}
                                height={200}
                                className="object-cover w-full h-auto rounded-lg shadow-xl"
                            />
                            <div className="p-2 bg-primary-100 rounded-lg shadow-md m-4 h-32">
                                <h1 className="text-lg font-bold">The Toy Store</h1>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                            
                        </div>

                        <div className="flex flex-col p-2 bg-primary-200 rounded-lg shadow-md m-4 overflow-hidden aspect-3/4 h-fit w-fit">
                            <Image
                                src="/vendur_store_temp_4.png"
                                alt="Featured"
                                width={100}
                                height={200}
                                className="object-cover w-full h-auto rounded-lg shadow-xl"
                            />
                            <div className="p-2 bg-primary-100 rounded-lg shadow-md m-4 h-32">
                                <h1 className="text-lg font-bold">Shoe Shop</h1>
                                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                            
                        </div>


                    </div>


            </div>
            
        
        </>


    );
}
