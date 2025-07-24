import {
  PlusIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';

export default function Wallet() {
  const transactions = [
    { id: 'Invoice#0089 Dec–Sep 2024', amount: '$14,000', date: 'Jun-06-24', status: 'Success' },
    { id: 'Invoice#0089 Dec–Sep 2024', amount: '$14,000', date: 'Jun-06-24', status: 'Pending' },
    { id: 'Invoice#0089 Dec–Sep 2024', amount: '$14,000', date: 'Jun-06-24', status: 'Pending' },
    { id: 'Invoice#0089 Dec–Sep 2024', amount: '$14,000', date: 'Jun-06-24', status: 'Pending' },
    { id: 'Invoice#0089 Dec–Sep 2024', amount: '$14,000', date: 'Jun-06-24', status: 'Pending' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Wallet</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Updated 20/07/2024 at 04:30 PM
      </p>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Wallet Summary & Transactions */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
                Wallet Balance
              </p>
              <button className="flex gap-1 items-center px-3 py-1 bg-blue-600 text-white rounded text-sm">
                <PlusIcon className="w-4 h-4" />
                Add New Wallet
              </button>
            </div>

            <p className="text-3xl font-bold my-4 text-gray-900 dark:text-white">$201,01</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white p-3 rounded">
                <p className="text-sm">Total Investment</p>
                <p className="text-xl font-bold">$201,01</p>
              </div>
              <div className="bg-yellow-100 dark:bg-yellow-600 text-yellow-800 dark:text-white p-3 rounded">
                <p className="text-sm">Total Return</p>
                <p className="text-xl font-bold">$201,01</p>
              </div>
              <div className="bg-green-100 dark:bg-green-600 text-green-800 dark:text-white p-3 rounded">
                <p className="text-sm">All Time Profit / Loss</p>
                <p className="text-xl font-bold">$201,01</p>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                Transaction History
              </h2>
              <select className="text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                <option>Month</option>
                <option>Week</option>
                <option>Day</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
                    <th></th>
                    <th>Invoice</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, idx) => (
                    <tr key={idx} className="border-b dark:border-gray-700">
                      <td className="py-2">
                        <input type="checkbox" />
                      </td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">
                        {t.id}
                      </td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">
                        {t.amount}
                      </td>
                      <td className="py-2 text-gray-800 dark:text-gray-200">
                        {t.date}
                      </td>
                      <td className="py-2">
                        <span
                          className={`flex items-center gap-1 text-xs ${
                            t.status === 'Success'
                              ? 'text-green-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {t.status === 'Success' ? (
                            <CheckCircleIcon className="w-4 h-4" />
                          ) : (
                            <ClockIcon className="w-4 h-4" />
                          )}
                          {t.status}
                        </span>
                      </td>
                      <td className="py-2">
                        <button className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Buy Form */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow space-y-4">
            <h2 className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Buy Coin
            </h2>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Coin</label>
              <input
                type="text"
                defaultValue="$2.00"
                className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Coin</label>
              <input
                type="text"
                defaultValue="$2.00"
                className="w-full mt-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <p className="text-xs text-gray-400">No extra fees</p>

            <div className="flex items-center gap-2">
              <input type="radio" name="payment" defaultChecked />
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Credit / Debit Card
              </span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Expiration"
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700"
            />

            <button className="w-full py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
