
export default function Pill({ text }: { text: string }) {
    return (
        <div className="my-10 bg-primary-400 w-fit px-3 rounded-2xl font-bold m-4 transition-colors hover:bg-primary-500 hover:cursor-pointer">

            {text}

        </div>
    );
}