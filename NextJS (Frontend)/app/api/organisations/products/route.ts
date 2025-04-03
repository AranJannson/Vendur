// import { NextRequest, NextResponse } from "next/server";
//
// export async function GET(req: NextRequest) {
//     try {
//         const response = await fetch("http://localhost:8003/products", {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(payload)
//         });
//
//         if (!response.ok) {
//             const errorData = await response.json();
//             return NextResponse.json({ error: errorData.error }, { status: response.status });
//         }
//
//         const data = await response.json();
//         return NextResponse.json(data, { status: 200 });
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }
