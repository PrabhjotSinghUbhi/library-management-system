import React from "react";

function Fines({ activeTab, fines, handlePayFine }) {
    return (
        <div>
            {activeTab === "fines" && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Fines Management ({fines.length})
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Fine ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Loan ID
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Amount
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {fines.map((fine) => (
                                    <tr
                                        key={fine.fine_id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm">
                                            {fine.fine_id}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {fine.loan_id}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-semibold">
                                            ₹{fine.amount}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    fine.paid
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                }`}
                                            >
                                                {fine.paid ? "Paid" : "Unpaid"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {!fine.paid && (
                                                <button
                                                    onClick={() =>
                                                        handlePayFine(
                                                            fine.fine_id
                                                        )
                                                    }
                                                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors text-xs font-semibold"
                                                >
                                                    Pay Fine
                                                </button>
                                            )}
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

export default Fines;
