import Pill from "@/app/components/ui/Pill";

export default function NavBar() {
    const pillLabels = ["Clothing", "Household", "Christmas", "Easter", "Electronics", "Healthcare", "Books", "Accessories", "Kitchen", ];

    return (
        <div className="w-full flex md:justify-center bg-primary-200 flex-row gap-1 p-2 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide rounded-t-3xl">
            {pillLabels.map((label, index) => (
                <Pill key={index} text={label} />
            ))}
        </div>
    );
}
