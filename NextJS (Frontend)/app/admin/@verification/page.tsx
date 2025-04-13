export default function Verification() {

    const companies: string[] = ["Vendur A", "Vendur B", "Vendur C", "Vendur D", "Vendur E", "Vendur F"];
    // const companies: string[] = []

    return (
        <div className="aspect-[2/1] rounded-xl shadow-xl bg-primary-300 max-h-96 p-6 flex flex-col">
            <h2 className="font-bold text-2xl">Verification Requests</h2>
            <ul className="flex-1 flex flex-col gap-4 py-4 overflow-y-auto rounded-xl">
                {companies.length > 0 ? (
                    companies.map((company, index) => (
                        <li key={index} className="grid grid-cols-2 bg-background-500 p-4 rounded-xl w-full">
                            <div className="flex items-center">
                                <h3 className="text-lg font-semibold">{company}</h3>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-secondary-500 rounded-lg p-2 transition-colors hover:bg-secondary-400">
                                    View Request
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="flex justify-center items-center bg-background-500 p-4 rounded-xl w-full content-center text-center">
                        <span className="text-lg font-semibold h-60">No verification requests</span>
                    </li>
                )}
            </ul>
        </div>
    );
}