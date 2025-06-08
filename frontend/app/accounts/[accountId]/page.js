import Link from 'next/link';
import AccountInteractive from './AccountInteractiveClient';
// import api from '../../../services/api';

async function getAccountData(accountId) {
    if (!accountId) return { account: null, transactions: [], error: 'Account ID is missing' };
    try {
        const accountRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}`, { cache: 'no-store' });
        if (!accountRes.ok) {
            const errorData = await accountRes.text();
            console.error("Error fetching account:", errorData);
            return { account: null, transactions: [], error: `Failed to fetch account: ${accountRes.status}` };
        }
        const account = await accountRes.json();

        const transactionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts/${accountId}/transactions`, { cache: 'no-store' });
        if (!transactionsRes.ok) {
            const errorData = await transactionsRes.text();
            console.error("Error fetching transactions:", errorData);
            return { account, transactions: [], error: `Failed to fetch transactions: ${transactionsRes.status}` };
        }
        const transactions = await transactionsRes.json();
        return { account, transactions, error: null };
    } catch (err) {
        console.error("Error in getAccountData:", err);
        return { account: null, transactions: [], error: err.message || 'Failed to fetch account details.' };
    }
}

export default async function AccountDetailsPage({ params }) {
    const { accountId } = await params;
    const { account, transactions, error } = await getAccountData(accountId);

    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
    if (!account) return <p className="text-center mt-10">Account not found or failed to load.</p>;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <header>
                    <Link href="/accounts" className="text-blue-600 hover:text-blue-800">&larr; Back to Accounts</Link>
                    <h1 className="mt-4 text-3xl font-bold text-white">Account Details</h1>
                </header>

                <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl text-gray-800 mb-2"><span className="font-semibold">Account Holder:</span> {account.name}</h2>
                    <p className="text-lg text-gray-700"><span className="font-semibold">Account ID:</span> <span className="font-medium">{account.customerId}</span></p>
                    <p className="text-2xl font-bold text-green-600 mt-2">Balance: ${account.balance?.toFixed(2)}</p>
                </div>

                <AccountInteractive initialAccount={account} accountId={accountId} />

                <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h3>
                    {transactions && transactions.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {transactions.map((tx) => (
                                <li key={tx.id} className="py-4">
                                    <p className="text-sm text-gray-700">{tx.transactionDescription}</p>
                                    <p className="text-xs text-gray-500">
                                        Timestamp: {new Date(tx.transactionTimestamp).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No transactions found for this account.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
