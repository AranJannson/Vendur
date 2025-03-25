export default function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars

    return (
        <div className="flex">
            {Array(fullStars).fill('★').map((_, index) => (
                <span key={index} className="text-yellow-500 font-bold text-xl">★</span>
                ))}

            {Array(emptyStars).fill('★').map((_, index) => (
                <span key={index} className="text-gray-400 font-bold text-xl">★</span>
                ))}
        </div>
    );
}