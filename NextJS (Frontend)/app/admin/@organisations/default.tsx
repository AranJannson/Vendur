import OrgInfo from "@/app/components/admin/OrgInfo";

export default function OrganisationsDefault() {
  return (
    <div className="bg-secondary-400 rounded-xl m-4 p-5">
      <h2 className="font-bold text-3xl text-center pb-5">Organisations</h2>
      <OrgInfo />
    </div>
  );
}