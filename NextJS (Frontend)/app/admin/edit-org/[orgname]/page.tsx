import EditOrganisationForm from "@/app/components/forms/EditOrganisation";

type params = {
  params: {
    orgname: string;
  };
};

export default async function EditOrgPage({ params }: params) {
  const id = (params.orgname);
  return (
    <div className="bg-secondary-400 rounded-xl m-4 p-5">
      <h2 className="font-bold text-3xl text-center pb-5">
        Edit Organisation
      </h2>
      <EditOrganisationForm id={id} />
    </div>
  );
}