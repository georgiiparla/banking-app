'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import api from '../../../services/api';
import Link from 'next/link';

export default function CreateBranchPage() {
    const [address, setAddress] = useState('');
    const [initialFunds, setInitialFunds] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!address || !initialFunds) {
            setError('Address and Initial Funds are required.');
            return;
        }
        if (parseFloat(initialFunds) < 0) {
            setError('Initial funds cannot be negative.');
            return;
        }

        try {
            const response = await api.post('/branches', { address, initialFunds: parseFloat(initialFunds) });
            setMessage(`Branch created successfully! Branch ID: ${response.data.id}, Address: ${response.data.address}`);
            setAddress('');
            setInitialFunds('');
            // router.push('/'); // Optionally redirect to home or branches list
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to create branch.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl text-gray-900">
                        Create a New Bank Branch
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {message && <p className="text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
                    {error && <p className="text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="address" className="sr-only">Branch Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Branch Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <label htmlFor="initialFunds" className="sr-only">Initial Funds</label>
                            <input
                                id="initialFunds"
                                name="initialFunds"
                                type="number"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Initial Funds"
                                value={initialFunds}
                                onChange={(e) => setInitialFunds(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Create Branch
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
