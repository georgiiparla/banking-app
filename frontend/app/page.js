import Link from 'next/link';
// import api from '../services/api';

async function getBranches() {
  try {
    // Note: In a real app, you might make this call directly if your API is internal
    // or use a server-side fetch. For external APIs, this pattern is fine.
    // However, for App Router, direct fetch or Route Handlers are often preferred for server-side data.
    // For simplicity in this refactor, we'll assume `api.get` works,
    // but ideally, this would be a direct `fetch` call in a Server Component.
    // Let's simulate a client-side fetch pattern within a server component for now,
    // or better, make this a client component if we stick to `useEffect` for fetching.
    // For a true Server Component data fetch:
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/branches`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch branches');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching branches data:", error);
    return [];
  }
}

// TODO: make each branch accessible via api (personal page per each branch)

export default async function HomePage() {
  const branches = await getBranches();

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl text-black sm:text-5xl">
            Banking clone
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage your accounts and branches efficiently.
          </p>
        </header>

        <nav className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/accounts/open" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out text-center">
            Open New Account
          </Link>
          <Link href="/accounts" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out text-center">
            View Account
          </Link>
          <Link href="/branches/create" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out text-center">
            Create New Branch
          </Link>
        </nav>

        <section>
          <h2 className="text-2xl font-semibold text-gray-500 mb-4">Branches</h2>
          {branches && branches.length > 0 ? (
            <ul className="space-y-4">
              {branches.map((branch) => (
                <li key={branch.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-medium text-gray-900">{branch.address}</h3>
                  <p className="text-gray-600">Cash on Hand: ${branch.cashOnHand?.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">Branch ID: {branch.id}</p>
                  <Link href={`/branches/${branch.id}/add-teller`} className="mt-2 inline-block text-sm text-blue-500 hover:text-blue-700">
                    Add Teller to Branch {branch.id}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No branches available. Create one or check if the backend is running.</p>
          )}
        </section>
      </div>
    </div>
  );
}
