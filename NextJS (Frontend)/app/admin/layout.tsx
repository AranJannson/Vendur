import { ReactNode } from 'React';
import {AdminHeader} from "@/app/components/admin/AdminHeader";

export default function Layout({
  children,
  analytics,
  products,
    verification,
    organisations
}: {
  children: ReactNode
  analytics: ReactNode
  products: ReactNode
    verification: ReactNode
    organisations: ReactNode
}) {
  return (
    <>
        <AdminHeader/>
      <div className="admin-dashboard">
        <div className="admin-analytics admin-block">
          {analytics}
        </div>
        <div className="admin-products admin-block">
          {products}
        </div>
        <div className="admin-verification admin-block">
          {verification}
        </div>
        <div className="admin-organisations admin-block">
          {organisations}
        </div>
      </div>
    </>
  )
}