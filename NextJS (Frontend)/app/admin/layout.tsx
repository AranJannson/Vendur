import { ReactNode } from 'react';
import {AdminHeader} from "@/app/components/admin/AdminHeader";

export default function Layout({
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

        <div>
            {children}
        </div>

    </>
  )
}