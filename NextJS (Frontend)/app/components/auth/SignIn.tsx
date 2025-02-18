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
        <div className="bg-primary-900 p-10 rounded-lg md:rounded-r-lg md:rounded-l-none m-2 md:m-0">
            <div className="flex flex-col gap-4 mb-5 ">
                <span className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-center">
                        Welcome To
                    </h1>
                    <h1 className="text-2xl font-bold text-center text-accent-400">
                        Vendur!
                    </h1>
                </span>

                <h2 className="text-xl font-bold text-center">
                    Sign In
                </h2>
            </div>

            <form className="flex flex-col gap-10 justify-center text-center" onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}>
                <span className="flex flex-col">
                    <label className="text-lg font-bold text-left">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-lg text-black p-2"/>
                </span>

                <span className="flex flex-col">
                    <label className="text-lg font-bold text-left">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-lg text-black p-2"/>
                </span>
                <button type="submit" className="bg-primary-400 hover:bg-primary-300 rounded-lg p-2 shadow-5xl transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-primary-300">Sign In</button>
                    {error && <p>{error}</p>}

                <span>
                    <p  className="text-accent-400">Don&#39;t have an account? </p> <a href="/auth/signup" className="text-accent-500 transition-colors hover:text-accent-600 hover:cursor-pointer">Sign Up</a>
                </span>
            </form>
        </div>

)
}