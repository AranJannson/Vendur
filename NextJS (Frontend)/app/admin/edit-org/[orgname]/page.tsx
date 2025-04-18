import EditOrganisationForm from "@/app/components/forms/EditOrganisation";

type params = {
  params: {
    orgname: string;
  };
};

export default async function EditOrgPage({ params }: params) {
  const vendur_id = parseInt(params.orgname, 10);
  return (
    <div className="bg-secondary-400 rounded-xl m-4 p-5">
      <h2 className="font-bold text-3xl text-center pb-5">
        Editing Organisation ID: <span className="text-center bg-background-100 rounded-lg shadow-xl py-1 px-2">{vendur_id}</span>
      </h2>
      <EditOrganisationForm vendur_id={vendur_id} />
    </div>
  );
}