import { ReactNode } from 'react';
import {AdminHeader} from "@/app/components/admin/AdminHeader";
import {stackServerApp} from "@/stack";

export const metadata = {
  title: "Admin | Vendur",
  description: "",
};

export default async function Layout({
  children,
  analytics,
  products,
  verification,
  organisations
}: {
  children?: ReactNode
  analytics: ReactNode
  products: ReactNode
  verification: ReactNode
  organisations: ReactNode
}) {


    const user = await stackServerApp.getUser({ or: 'redirect' });
    const userTeam = await user.getTeam("b523f683-3c55-4341-977d-6252a77265c1");

    if(!userTeam){
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">You are not an admin</h1>
                <p className="text-lg">Please contact your administrator.</p>
            </div>
        )
    }

  return (
    <>
        <AdminHeader/>
      <div className="">
        <div className="grid grid-cols-2 gap-6 p-4">

          <div className="w-full">
            {products}
          </div>

          <div className="w-full">
            {verification}
          </div>

        </div>
      </div>

      <div className="w-full">
        {analytics}
      </div>

      <div className="w-full">
        {organisations}
      </div>

      <div className="w-full">
        {children}
      </div>

    </>
  )
}