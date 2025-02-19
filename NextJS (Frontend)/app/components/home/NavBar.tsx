import Pill from "@/app/components/ui/Pill";

export default function NavBar() {
    const pillLabels = ["Clothing", "Household", "Christmas", "Easter", "Electronics", "Healthcare", "Books", "Accessories", "Kitchen"];

    return (
        <div className="w-screen flex justify-center bg-background-900 flex flex-row gap-1 p-2 overflow-x-scroll overflow-y-hidden rounded-t-lg">
            {pillLabels.map((label, index) => (
                <Pill key={index} text={label} />
            ))}
        </div>
    );
}
