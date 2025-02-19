import Card from "@/app/components/ui/Card";

export default function TestPage(){

    return(
        <>
            <div className="mr-auto box-border size-64 border-8 p-4 box-content md:box-border aspect-square bg-white">
            </div>
            <div className="m-px box-border size-64 border-4 p-4 box-content md:box-border aspect-square bg-blue-500">
            </div>
            <h1>Ok</h1>

            <div className="flex flex-row justify-start items-center w-screen space-x-4">
            <Card/>
            <Card/>
            <Card/>
            </div>
            
        

        </>

    );
}