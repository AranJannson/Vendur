"use client";

import { useState } from 'react';
import {createClient} from "@supabase/supabase-js";
import { useUser } from "@stackframe/stack";
import {redirect} from "next/navigation";

export default function CreateOrg() {

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);
    const user = useUser({ or: 'redirect' });

    const [isLoading, setIsLoading] = useState(false);



    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get('name');
        const email = formData.get('organisationEmail');
        const description = formData.get('description');
        const telephone = formData.get('telephone');
        const address = formData.get('address');

        setIsLoading(true);

        if (!name) {
            console.error('Organisation name is required');
            return;
        }

        const org = await user.createTeam({
            displayName: name.toString(),
        });

        const orgID = org?.id;

        if (!orgID) {
            console.error('Organisation ID is required');
            return;
        }

        if(org){
            const { error } = await supabase.from('orgs').insert({id: orgID, name: name, description: description, email: email, telephone: telephone, address: address});

            if (error) {
                console.error('Error creating organisation:', error);
                setIsLoading(false);
                await org.delete();
                return;
            }

            redirect("/organisations/management")
        }else{
            console.error('Error creating organisation');
            setIsLoading(false);
            return;
        }

    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4 p-4 bg-primary-100 rounded-lg shadow-md">
            <h1 className="text-xl font-bold">Organisation Creation</h1>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <span className="flex flex-col gap-2">
                    <label htmlFor="name">Organisation Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your organisation's name"
                        required
                        className="p-2 rounded-lg bg-background-100"
                    />
                </span>

                <span className="flex flex-col gap-2">
                    <label htmlFor="description">Organisation Description</label>
                    <textarea
                        name="description"
                        placeholder="Describe your organisation"
                        required
                        className="p-2 rounded-lg bg-background-100"
                    />
                </span>

                <span className="flex flex-col gap-2">
                    <label htmlFor="organisationEmail">Organisation Email</label>
                    <input
                        type="email"
                        name="organisationEmail"
                        placeholder="example@organisation.com"
                        required
                        className="p-2 rounded-lg bg-background-100"
                    />
                </span>

                <span className="flex flex-col gap-2">
                    <label htmlFor="telephone">Telephone (Include Country Code)</label>
                    <input
                        type="tel"
                        name="telephone"
                        placeholder="+44 1234 567890"
                        required
                        className="p-2 rounded-lg bg-background-100"
                    />
                </span>

                <span className="flex flex-col gap-2">
                    <label htmlFor="address">Organisation Address</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="123 Business Street, City, Country"
                        required
                        className="p-2 rounded-lg bg-background-100"
                    />
                </span>
            </div>

            <div className="flex flex-col gap-2 bg-background-200 p-2 rounded-lg">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="agreement"
                        required
                        className="accent-blue-500 w-4 h-4"
                    />
                    I agree to the terms and conditions.
                </label>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="bg-secondary-300 p-3 font-semibold rounded-xl transition-colors hover:bg-secondary-400"
            >
                {isLoading ? "You are being redirected..." : "Create Organisation"}
            </button>
        </form>
    );
}
