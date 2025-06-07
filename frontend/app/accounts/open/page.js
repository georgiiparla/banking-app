"use client"

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import api from '../../../services/api';
import Link from 'next/link';

export default function OpenAccountPage() {
    const [customerName, setCustomerName] = useState('');
    const [branchId, setBranchId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        if (!customerName || !branchId) {
            setError('Customer name and Branch ID are required.');
            return;
        }
        try {
            const response = await api.post('/accounts', { customerName, branchId: parseInt(branchId) });
            setMessage(`Account created successfully! Account ID: ${response.data.customerId}`);
            setCustomerName('');
            setBranchId('');
            // router.push(`/accounts/${response.data.customerId}`); // Optional redirect
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to open account.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-blue-300">
                <div>
                    <h2 className="mt-6 text-center text-3xl text-gray-900">
                        Open a New Bank Account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {message && <p className="text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
                    {error && <p className="text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="customerName" className="sr-only">Customer Name</label>
                            <input
                                id="customerName"
                                name="customerName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Customer Name"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="branchId" className="sr-only">Branch ID</label>
                            <input
                                id="branchId"
                                name="branchId"
                                type="number"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Branch ID"
                                value={branchId}
                                onChange={(e) => setBranchId(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Open Account
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
