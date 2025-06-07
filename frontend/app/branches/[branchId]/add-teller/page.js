'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import api from '../../../../services/api';
import Link from 'next/link';

export default function AddTellerPage() {
    const params = useParams(); // { branchId: 'value' }
    const branchId = params.branchId;
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!branchId) {
            setError('Branch ID is missing from URL.');
            return;
        }

        try {
            const response = await api.post(`/branches/${branchId}/tellers`);
            setMessage(`Teller added successfully to Branch ID ${branchId}! Teller ID: ${response.data.id}`);
            // router.push('/'); // Optionally redirect
        } catch (err) {
            setError(err.response?.data?.message || err.message || `Failed to add teller to branch ${branchId}.`);
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl text-gray-900">
                        Add Teller to Branch {branchId}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {message && <p className="text-green-600 bg-green-50 p-3 rounded-md">{message}</p>}
                    {error && <p className="text-red-600 bg-red-50 p-3 rounded-md">{error}</p>}

                    <p className="text-center text-gray-700">
                        Click the button below to add a new teller to Branch ID: <strong>{branchId}</strong>.
                    </p>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Add Teller
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
