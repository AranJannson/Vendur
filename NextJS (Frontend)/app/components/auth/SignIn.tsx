'use client'
import { useStackApp } from "@stackframe/stack"
import { useState } from 'react';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const app = useStackApp();

    const onSubmit = async () => {
        if(!password) {
            setError('Password is required');
            return;
        }

        const result = await app.signInWithCredential({ email, password });

        if (result.status === 'error') {
            setError(result.error.message);
        }
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Sign In</button>
            {error && <p>{error}</p>}
        </form>
    )
}