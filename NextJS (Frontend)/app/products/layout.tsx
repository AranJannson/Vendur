import { ReactNode } from "react";
export default function ProductsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
    // TODO: POST request to /api/track-view
    return(
        <div className="products-layout">
            {children}
        </div>
    )
}