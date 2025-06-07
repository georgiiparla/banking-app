import Link from 'next/link';

async function getAllAccounts() {
  try {
    // In a real app, we have a /accounts endpoint that returns all accounts
    // For now, this is a placeholder.
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accounts`, { cache: 'no-store' });
    // if (!res.ok) throw new Error('Failed to fetch accounts');
    // return res.json();
    console.warn("Placeholder: /api/accounts endpoint for GET all not fully implemented in backend example.");
    return [
      // { customerId: 1, name: "Alice (Sample)", balance: 1200.50 },
      // { customerId: 2, name: "Bob (Sample)", balance: 300.75 }
    ]; // Return empty or sample data
  } catch (error) {
    console.error("Error fetching accounts data:", error);
    return [];
  }
}

export default async function AccountsListPage() {
  const accounts = await getAllAccounts();

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">&larr; Back to Home</Link>
          <h1 className="mt-4 text-3xl text-black">All Bank Accounts</h1>
        </header>

        {accounts && accounts.length > 0 ? (
          <ul className="space-y-4">
            {accounts.map((account) => (
              <li key={account.customerId} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/accounts/${account.customerId}`} className="block">
                  <h3 className="text-xl font-medium text-blue-600 hover:text-blue-700">{account.name}</h3>
                  <p className="text-gray-700">Account ID: {account.customerId}</p>
                  <p className="text-gray-600">Balance: ${account.balance?.toFixed(2)}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No accounts to display. The backend endpoint for listing all accounts might not be implemented or returned no data.</p>
        )}
        <div className="mt-8">
          <Link href="/accounts/open" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out">
            Open a New Account
          </Link>
        </div>
      </div>
    </div>
  );
}
