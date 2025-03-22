export default function ReviewSection({ reviews }) {
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

        <form>
            <div className="flex flex-col">
                <label htmlFor="review" className="font-bold">Review</label>
                <textarea
                    name="review"
                    id="review"
                    className="p-2 bg-primary-100 rounded-lg"
                />
            </div>

            <div className="flex flex-col mt-4">
                <label className="font-bold">Rating</label>
                <div className="flex gap-2">
                    {/* Change the radio buttons to stars */}
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value} className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="rating"
                                value={value}
                                className="accent-primary-500"
                            />
                            {value}
                        </label>
                    ))}
                </div>
            </div>
            <button type="submit"
                    className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                Submit
            </button>
        </form>

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