import Pill from "@/app/components/ui/Pill";

export function AdminHeader() {
    return (
        <div className="w-full h-20 bg-secondary-400 rounded-b-xl">
            <div className="flex content-end pb-5">
                <Pill text="Function 1"/>
                <Pill text="Function 2"/>
                <Pill text="Function 3"/>

            </div>
        </div>
    )
}