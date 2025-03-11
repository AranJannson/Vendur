import Pill from "@/app/components/ui/Pill";

export default function NavBar() {
    //const pillLabels = ["Clothing", "Household", "Christmas", "Easter", "Electronics", "Healthcare", "Books", "Accessories", "Kitchen", ];
    const pillLabels = ["Books, Films & Music", "Electronics & Computing", "Home, Garden & DIY", "Health & Beauty", "Sport & Activity",
         "Stationary & Craft Supplies", "Clothing & Shoes", "Art & Collectables", "Pet Supplies", "Toys & Games"];

    return (
        <div className="w-full flex  bg-primary-200 flex-row gap-1 p-2 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide rounded-t-3xl">
            {pillLabels.map((label, index) => (
                <Pill key={index} text={label} />
            ))}
        </div>
        
    );
}
