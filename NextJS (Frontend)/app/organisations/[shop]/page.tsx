export async function generateMetadata({ params }: { params: { shop: string } }) {
  const shop = await params.shop;

  return {
    title: `${shop} | Vendur`,
    description: "shop shop shop",
  };
}

export default function ShopPage({ params }: { params: { shop: string } }) {
  const shop = params.shop;
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">{shop}</h1>
      <p>Welcome to: {shop}</p>
    </div>
  );
}