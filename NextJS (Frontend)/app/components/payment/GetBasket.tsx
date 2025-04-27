import DeleteBasketButton from "@/app/components/payment/DeleteBasketButton";
import DeleteItemButton from "@/app/components/payment/DeleteItemButton";
import { useCallback, useEffect, useState } from "react";
import GetBasketCountdownTimer from "./GetBasketCountdownTimer";
import { getOriginalStock, modifyStock } from "@/utils/catalogue/utils";
import { fetchBasket } from "@/utils/payment/utils";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

export default function GetBasket() {
  const [basket, setBasket] = useState<Item[]>([]);
  const [basketLoading, setBasketLoading] = useState(true);
  const [quantityLoading, setQuantityLoading] = useState(false);

  const amount = basket.reduce((total: number, item: any) => {
    return total + item.price * item.quantity;
  }, 0);

  const loadBasket = useCallback(async () => {
    setBasketLoading(true);
    const data = await fetchBasket();
    setBasket(data);
    setBasketLoading(false);
  }, []);

  useEffect(() => {
    loadBasket();
  }, [loadBasket]);

  if (basketLoading) return <p>Loading basket...</p>;

  return (
    <div>
      <h2>Basket:</h2>
      {basket && basket.length > 0 ? (
        <div>
          <ul className="flex gap-8 overflow-x-auto p-4">
            {basket.map((item, index) => (
              <div key={index} className="mb-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <div className="bg-secondary-100 max-w-[10rem] max-h-[10rem] p-4 m-4 rounded-lg flex justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="300"
                    height="300"
                    className="object-contain"
                  />
                </div>
                <p>Id: {item.id}</p>
                <p>Price: £{item.price.toFixed(2)}</p>
                {item.size !== null && (
                  <div>
                    <label className="font-bold ml-1">Size</label>
                    <select
                      className="p-2 bg-primary-200 rounded-full w-13 ml-2"
                      name="size"
                      defaultValue={item.size}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length === 1) {
                          setBasket((prevBasket) =>
                            prevBasket.map((basketItem) =>
                              basketItem.id === item.id
                                ? { ...basketItem, size: value as Item["size"] }
                                : basketItem
                            )
                          );
                        }
                      }}
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                )}
                <label className="font-bold ml-1">Quantity</label>
                <select
                  value={item.quantity} // Set selected value to current quantity
                  onChange={async (e) => {
                    if (quantityLoading) return; // Prevent multiple cdivcks while basketLoading

                    setQuantityLoading(true); // Set basketLoading to true when request starts

                    try {
                      const newQuantity = parseInt(e.target.value);
                      const difference = item.quantity - newQuantity;

                      await modifyStock(item, difference);

                      setBasket((prevBasket) =>
                        prevBasket.map((basketItem) =>
                          basketItem.id === item.id
                            ? { ...basketItem, quantity: newQuantity }
                            : basketItem
                        )
                      );
                    } catch (error) {
                      console.error("Error modifying stock:", error);
                    } finally {
                      setQuantityLoading(false); // Set basketLoading to false when request finishes
                    }
                  }}
                  className="p-2 bg-primary-200 rounded-full w-13 ml-2"
                  name="quantity"
                >
                  {Array.from(
                    {
                      length: Math.min(
                        getOriginalStock(Number(item.id)) || 0,
                        10
                      ),
                    },
                    (_, i) => i + 1
                  ).map((qty) => (
                    <option key={qty} value={qty}>
                      {qty}
                    </option>
                  ))}
                </select>
                <DeleteItemButton item={item} refreshBasket={loadBasket} />
              </div>
            ))}
          </ul>
          {basket.length != 1 && (
            <DeleteBasketButton basket={basket} refreshBasket={loadBasket} />
          )}
          {quantityLoading && "Loading quantity..."}
          <p>Total: £{amount.toFixed(2)}</p>
          <GetBasketCountdownTimer basket={basket} />
          <a href="/payment/checkout">
            <button className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
              Go to Checkout
            </button>
          </a>
        </div>
      ) : (
        <p>No items in basket.</p>
      )}
    </div>
  );
}
