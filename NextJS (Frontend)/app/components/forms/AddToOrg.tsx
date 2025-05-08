'use client';

import { useUser } from "@stackframe/stack";
import { useState } from "react";

export default function AddToOrg() {
    const user = useUser({ or: 'redirect' });
    const allTeams = user.useTeams();
    const team = user.useTeam(allTeams[0]?.id);

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleInvite = async () => {
        if (!team) {
            setMessage('No team available.');
            return;
        }

        if (!email) {
            setMessage('Please enter a valid email.');
            return;
        }

        try {
            await team.inviteUser({ email: email.toString() });
            setMessage('Invitation sent successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to send invitation.');
        }
    };

    return (
        <div className="flex flex-row gap-4 items-center justify-center content-center">
            <h1 className="text-2xl font-bold">Invite User to Organisation</h1>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user's email"
                className="border p-2 rounded w-full max-w-md"
            />
            <button
                onClick={handleInvite}
                className="bg-primary-500 hover:bg-primary-400 p-2 rounded shadow w-full max-w-md"
            >
                Invite User
            </button>

            {message && (
                <p className="mt-2 text-center">{message}</p>
            )}
        </div>
    );
}