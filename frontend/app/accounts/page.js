import Link from "next/link";

async function getAccounts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/accounts`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch accounts');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching accounts data:", error);
    return [];
  }
}

export default async function ViewAllAccountsPage() {
  const accounts = await getAccounts();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800">&larr; Back to Home</Link>
        </header>
        <h2 className="text-2xl font-semibold text-gray-500 mb-4">All Accounts</h2>
        <section>
          {accounts && accounts.length > 0 ? (
            <ul className="space-y-4">
              {accounts.map(({ customerId, name }) => (
                <li key={customerId} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-medium text-gray-900">{name}</h3>
                  <Link href={`/accounts/${customerId}`} className="mt-2 inline-block text-sm text-blue-500 hover:text-blue-700">
                    Check details
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No accounts available. Create one or check if the backend is running.</p>
          )}
        </section>
      </div>
    </div>
  );
}

