import ReviewForm from "@/app/components/forms/ReviewForm";

export default function ReviewSection({ reviews, item_id}) {
    return (
        <div
    className = "bg-secondary-100 m-4 rounded-lg p-5 flex flex-col gap-4" >
        <h2
    className = "text-2xl font-bold" > Reviews < /h2>

    <div className="grid grid-cols-2 bg-primary-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold">Average Rating: item.rating</h3>
        <h3 className="text-sm font-semibold">Total Reviews: item.reviewsCount</h3>
    </div>

    <div className="bg-primary-200 rounded-lg p-5">
        <h2 className="font-bold text-xl mb-3">Add a Review</h2>
        <ReviewForm item_id={item_id} />
    </div>

    <h2 className="text-2xl font-bold">Recent Reviews</h2>
    {/*<p>{item.reviews ? item.reviews : 'No reviews yet'}</p>*/}
            {reviews.map((review) => (
                <div key={review.id} className="bg-primary-200 rounded-lg p-5">
                    <div className="text-2xl">
                        {Array.from({ length: review.rating }).map((_, index) => (
                        <span key={index}>★</span>
                        ))}
                        {Array.from({ length: 5 - review.rating }).map((_, index) => (
                        <span key={index}>☆</span>
                        ))}

                    </div>


                    <p>{review.reviewText}</p>
                </div>
                    ))}
</div>
    )
}