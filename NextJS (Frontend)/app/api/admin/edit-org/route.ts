//import { NextResponse } from 'next/server';

// export async function PUT(request: Request) {
//   try {
//     const { id, name, email, description, telephone, website, address } = await request.json();

//     const response = await fetch('http://localhost:5078/admin/editOrgDetails', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         id,
//         name,
//         email,
//         description,
//         telephone,
//         website,
//         address
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update organization');
//     }

//     const result = await response.json();
//     return NextResponse.json(result);
    
//   } catch (error) {
//     return NextResponse.json(
//       { error: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

// export async function updateOrganisation(data: {
//   id: number;
//   name?: string;
//   email?: string;
//   description?: string;
//   telephone?: string;
//   website?: string;
//   address?: string;
// }) {
//   const response = await fetch('http://localhost:5078/admin/editOrgDetails', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update organisation');
//   }

//   return await response.json();
// }


  
