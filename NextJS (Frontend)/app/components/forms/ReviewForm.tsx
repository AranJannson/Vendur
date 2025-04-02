"use client"
import { useUser } from "@stackframe/stack";
import { useState } from "react";
export default function ReviewForm({ item_id }) {
    const user = useUser();
    // Use userid from user object
    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const review = formData.get('review');
        const rating = formData.get('rating');

        // Send review to the API
        const payload = {
            user_id: user?.id,
            item_id: item_id,
            reviewText: review,
            rating: rating
        }
        // TODO: Popup to show success or error
        const response = await fetch('http://localhost:3000/api/review/make-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.status === 200) {
            alert(`Review submitted successfully`);
        } else {
            alert('Failed to submit review');
        }
    }
    return (
        <form onSubmit={onSubmit}>
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
                    {/* TODO: Change the radio buttons to stars */}
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
    );
}