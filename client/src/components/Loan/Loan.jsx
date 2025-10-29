import React from "react";

function Loan({ activeTab, loanSummary }) {
    return (
        <div>
            {activeTab === "loans" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Loan Summary ({loanSummary.length})
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Loan ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Member
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Book
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Issue Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Due Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Return Date
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loanSummary.map((loan) => (
                                    <tr
                                        key={loan.loan_id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            {loan.loan_id}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {loan.member_name}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {loan.book_title}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {new Date(
                                                loan.issue_date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {new Date(
                                                loan.due_date
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {loan.return_date
                                                ? new Date(
                                                      loan.return_date
                                                  ).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    loan.return_date
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {loan.return_date
                                                    ? "Returned"
                                                    : "Active"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Loan;
