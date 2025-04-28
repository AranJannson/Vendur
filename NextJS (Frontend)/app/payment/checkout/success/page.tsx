"use client";

export default function Success() {
  return (
    <div>
      <p>Transaction successful!</p>
      <a href="/payment">
        <button className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
          Back to basket
        </button>
      </ a>
    </div>
  );
}
