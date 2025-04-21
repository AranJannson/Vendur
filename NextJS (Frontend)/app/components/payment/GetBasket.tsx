import DeleteBasketButton from "@/app/components/payment/DeleteBasketButton";
import DeleteItemButton from "@/app/components/payment/DeleteItemButton";
import { useEffect, useState } from "react";
import GetBasketCountdownTimer from "./GetBasketCountdownTimer";

interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: (string & { length: 1 }) | null;
  image: string;
}

export default function GetBasket({ setBasketLength }: {setBasketLength: any}) {
  const [basket, setBasket] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBasket = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getBasket", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // <-- include cookies!
      });

      if (!response.ok) {
        throw new Error("Failed to fetch basket");
      }

      const data: Item[] = await response.json();
      setBasket(data);
      setBasketLength(data.length);
    } catch (error) {
      setBasketLength(0);
      console.error("Error fetching basket:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (loading) return <p>Loading basket...</p>;

  return (
    <div>
      <h2>Basket:</h2>
      {basket && basket.length > 0 ? (
        <div>
          <ul>
            {basket.map((item, index) => (
              <li key={index} className="mb-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <div className="bg-secondary-100 max-w-[10rem] max-h-[10rem] p-4 m-4 rounded-lg flex justify-center">
                  <img src={item.image} alt={item.name} width="300" height="300" className="object-contain" />
                </div>
                <p>Id: {item.id}</p>
                <p>Price: £{item.price.toFixed(2)}</p>
                {item.size !== null && (
                  <div>
                    <label className="font-bold ml-1">Size</label>
                    <select className="p-2 bg-primary-200 rounded-full w-20" name="size" defaultValue={item.size}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                )}
                <label className="font-bold ml-1">Quantity</label>
                <input
                  type="number"
                  defaultValue={item.quantity}
                  max="10"
                  min="1"
                  className="p-2 bg-primary-200 rounded-full w-20"
                  name="quantity"
                />
                <DeleteItemButton item={item} refreshBasket={fetchBasket} />
              </li>
            ))}
          </ul>
          {basket.length != 1 && <DeleteBasketButton basket={basket} refreshBasket={fetchBasket} />}
          <GetBasketCountdownTimer basket={basket}/>
        </div>
      ) : (
        <p>No items in basket.</p>
      )}
    </div>
  );
}
