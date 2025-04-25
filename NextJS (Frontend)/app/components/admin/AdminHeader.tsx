import Pill from "@/app/components/ui/Pill";

export function AdminHeader() {
    return (
        <div className="w-full h-30 bg-secondary-400 rounded-b-xl">
            <div className="flex items-center justify-center">
                {/* <Pill text="Function 1"/>
                <Pill text="Function 2"/>s
                <Pill text="Function 3"/> */}
                <p className = "text-6xl font-bold text-center text-gray-900 pt-3 pb-3">Administrator Panel</p>
            </div>
        </div>
    )
}