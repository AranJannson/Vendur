'use client';
import { useState, useEffect } from 'react';

import Link from "next/link";
interface Organisation {
    id: number;
    name: string;
    description: string;
    email: string;
    telephone: string;
    website: string
    address: string;
    is_verified: boolean;
    created_at: string;
}

const OrgInfo = () => {

    //const vendur_id = 1;

    // const response = await fetch('http://localhost:5078/admin/orgDetails', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: JSON.stringify({
    //         vendur_id: vendur_id
    //     })
    // });

    // const orgs: Organisation = await response.json();

    // return (
    //     <div className="w-full h-20 bg-secondary-400 rounded-b-xl">
    //         hello
    //         <p>{orgs.name}</p>
    //     </div>
    // )

    // const response = await fetch('http://localhost:5078/admin/getAllOrgs', {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    

    // const data = await response.json();

    const [data, setData] = useState<Organisation[]>([]);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  
    // Fetch data using useEffect
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('/api/admin/organisations');
          const data = await res.json();
          setData(data); // Set the data to state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    const sortedData = [...data].sort((a, b) => {
      if (sortConfig.key) {
        const aValue = a[sortConfig.key as keyof Organisation];
        const bValue = b[sortConfig.key as keyof Organisation];
  
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      }
      return 0;
    });
  
    const handleSort = (key: keyof Organisation) => {
      let direction = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });
    };

return (
    <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'id' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('id')}>ID {sortConfig.key === 'id' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'is_verified' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('is_verified')}>Verification Status {sortConfig.key === 'is_verified' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'name' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'description' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('description')}>Description {sortConfig.key === 'description' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'email' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('email')}>Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'telephone' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('telephone')}>Phone No. {sortConfig.key === 'telephone' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'website' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('website')}>Website {sortConfig.key === 'website' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'address' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('address')}>Address {sortConfig.key === 'address' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className={`py-2 px-4 border-b cursor-pointer ${sortConfig.key === 'created_at' ? 'bg-background-200 font-semibold' : ''}`} onClick={() => handleSort('created_at')}>Date Created {sortConfig.key === 'created_at' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}</th>
        <th className="py-2 px-4 border-b">Store Link</th>
        <th className="py-2 px-4 border-b">Edit Store</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((org) => (
          <tr key={org.id} className="hover:bg-gray-100 text-center">
            <td>{org.id}</td>
            <td>{org.is_verified ? "Verified ✅" : "Not Verified ❌"}</td>
            <td>{org.name}</td>
            <td>{org.description}</td>
            <td>{org.email}</td>
            <td>{org.telephone}</td>
            <td>{org.website}</td>
            <td>{org.address}</td>
            <td>{new Date(org.created_at).toLocaleDateString()}</td>
            <td className="underline text-center bg-background-100 rounded-lg shadow-xl py-1"><Link href={`/organisations/${org.name}`}>Link</Link></td>
            <td className="underline text-center bg-background-200 rounded-lg shadow-xl py-1"><Link href={`#`}>Edit</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrgInfo;