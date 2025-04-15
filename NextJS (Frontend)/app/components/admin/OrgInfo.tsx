

interface Organisation {
    id: number;
    name: string;
    description: string;
    email: string;
    telephone: string;
    website: string;
    address: string;
    is_verified: boolean;

}

export default async function OrgInfo() {

    const vendur_id = 1;

    const response = await fetch('http://localhost:5078/admin/orgDetails', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            vendur_id: vendur_id
        })
    });

    const orgs: Organisation = await response.json();

    return (
        <div className="w-full h-20 bg-secondary-400 rounded-b-xl">
            hello
            <p>{orgs.name}</p>
        </div>
    )
}