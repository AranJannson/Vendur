export default function ItemPage({ params }: { params: { item: string } }) {
    return <div>Slug: {params.item}</div>;
}