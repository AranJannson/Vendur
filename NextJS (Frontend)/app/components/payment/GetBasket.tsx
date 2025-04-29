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
      <div className="bg-secondary-400 rounded-xl m-4">
        <div className="bg-secondary-200 rounded-xl border-2 border-primary-500">
            <h1 className="text-3xl font-bold p-2">Your Basket</h1>
            <span className="flex flex-row gap-2 p-2">
              <b>Checkout In: </b>
              <GetBasketCountdownTimer basket={basket} />
            </span>
          <p className="p-2">To Secure Your Items Before They Sell Out!</p>

        </div>
        {basket && basket.length > 0 ? (
            <div className="flex flex-col">
              <ul className="flex flex-col gap-8 overflow-x-auto p-4 rounded-lg m-4">

                {basket.map((item, index) => (

                    <li key={index} className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 items-start bg-secondary-500 p-4 rounded-xl">
                      <div className="bg-secondary-200 w-fit h-full p-4 rounded-lg row-span-2 flex items-center">
                        <img src={item.image} alt={item.name} width="150" height="150" />
                      </div>

                      <div className="flex flex-col w-full bg-secondary-100 p-4 rounded-lg text-left">
                        <h2 className="text-xl font-bold mb-2">{item.name}</h2>
                        <p><b>Id:</b> {item.id}</p>
                        <p><b>Price:</b> £{item.price.toFixed(2)}</p>

                        <div className="bg-secondary-200 rounded-lg flex md:flex-row flex-col gap-2 justify-start items-center p-2 mt-2">
                          <label className="font-bold">Quantity: </label>
                          <select
                              value={item.quantity}
                              onChange={async (e) => {
                                if (quantityLoading) return;
                                setQuantityLoading(true);
                                try {
                                  const newQuantity = parseInt(e.target.value);
                                  const difference = item.quantity - newQuantity;
                                  await modifyStock(item, difference);
                                  setBasket((prev) =>
                                      prev.map((b) =>
                                          b.id === item.id ? { ...b, quantity: newQuantity } : b
                                      )
                                  );
                                } catch (err) {
                                  console.error(err);
                                } finally {
                                  setQuantityLoading(false);
                                }
                              }}
                              className="p-2 bg-primary-300 rounded-full w-13"
                          >
                            {Array.from(
                                { length: Math.min(getOriginalStock(Number(item.id)) || 0, 10) },
                                (_, i) => i + 1
                            ).map((qty) => (
                                <option key={qty} value={qty}>{qty}</option>
                            ))}
                          </select>

                          {item.size !== null && (
                              <div className="flex md:flex-row flex-col gap-2 justify-center items-center">
                                <label className="font-bold md:ml-2">Size: </label>
                                <select
                                    defaultValue={item.size}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (value.length === 1) {
                                        setBasket((prev) =>
                                            prev.map((b) =>
                                                b.id === item.id ? { ...b, size: value as Item["size"] } : b
                                            )
                                        );
                                      }
                                    }}
                                    className="p-2 bg-primary-300 rounded-full w-13"
                                >
                                  <option value="S">S</option>
                                  <option value="M">M</option>
                                  <option value="L">L</option>
                                  <option value="XL">XL</option>
                                </select>
                              </div>
                          )}
                        </div>
                      </div>
                      <div className="self-start">
                        <DeleteItemButton item={item} refreshBasket={loadBasket} />
                      </div>
                    </li>
                ))}

                {basket.length != 1 && (
                  <div className="bg-secondary-200 p-4 rounded-lg">

                    <h2 className="text-2xl font-bold">Changed Your Mind?</h2>


                        <DeleteBasketButton basket={basket} refreshBasket={loadBasket} />

                  </div>
                )}

                <div className="bg-secondary-200 p-4 rounded-lg grid grid-cols-1 grid-rows-2 grid-rows-[auto_1fr] gap-4">
                  <div className="">
                    {quantityLoading && "Loading quantity..."}
                    <p className="text-2xl"><b>Total:</b> £{amount.toFixed(2)}</p>
                  </div>

                  <a href="/payment/checkout">
                    <button className="bg-primary-400 p-4 rounded-lg transition-colors hover:bg-primary-500 px-8 mt-4">
                      Go to Checkout
                    </button>
                  </a>
                </div>
              </ul>
            </div>

        ) : (
              <p>No items in basket.</p>
        )}

      </div>
  );
}
