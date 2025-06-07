'use client';

import { useState } from 'react';
import api from '../../../services/api';

export default function AccountInteractive({ initialAccount, accountId }) {
    const [account, setAccount] = useState(initialAccount);
    const [amount, setAmount] = useState('');
    const [branchIdForTransaction, setBranchIdForTransaction] = useState('');
    const [transactionMessage, setTransactionMessage] = useState('');
    const [transactionError, setTransactionError] = useState('');

    const handleTransaction = async (type) => {
        setTransactionMessage('');
        setTransactionError('');
        if (!amount || !branchIdForTransaction) {
            setTransactionError('Amount and Branch ID are required for transaction.');
            return;
        }
        if (parseFloat(amount) <= 0) {
            setTransactionError('Amount must be positive.');
            return;
        }
        try {
            const response = await api.post(`/accounts/${accountId}/${type}`, {
                amount: parseFloat(amount),
                branchId: parseInt(branchIdForTransaction),
            });
            setAccount(response.data);
            setTransactionMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} successful! New Balance: $${response.data.balance.toFixed(2)}`);
            setAmount('');
            // TODO: try out global state manager later
        } catch (err) {
            setTransactionError(err.response?.data?.message || err.message || `Failed to process ${type}.`);
            console.error(err);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Make a Transaction</h3>
            {transactionMessage && <p className="text-green-600 bg-green-50 p-3 rounded-md mb-3">{transactionMessage}</p>}
            {transactionError && <p className="text-red-600 bg-red-50 p-3 rounded-md mb-3">{transactionError}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="mt-1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="branchIdForTransaction" className="block text-sm font-medium text-gray-700">Branch ID (for transaction)</label>
                    <input
                        type="number"
                        id="branchIdForTransaction"
                        value={branchIdForTransaction}
                        onChange={(e) => setBranchIdForTransaction(e.target.value)}
                        placeholder="Enter Branch ID"
                        className="mt-1 block text-black w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={() => handleTransaction('deposit')}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150"
                >
                    Deposit
                </button>
                <button
                    onClick={() => handleTransaction('withdraw')}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150"
                >
                    Withdraw
                </button>
            </div>
            {account && <p className="mt-4 text-lg text-gray-500">Current Balance (after potential transaction): ${account.balance?.toFixed(2)}</p>}
        </div>
    );
}
