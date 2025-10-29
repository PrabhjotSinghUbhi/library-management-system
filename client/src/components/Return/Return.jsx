import React from "react";

function Return({
    activeTab,
    handleReturnBook,
    returnForm,
    setReturnForm,
    loanSummary,
    loading,
}) {
    return (
        <div>
            {activeTab === "return" && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Return Book
                        </h2>
                        <form onSubmit={handleReturnBook} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Active Loan
                                </label>
                                <select
                                    value={returnForm.loan_id}
                                    onChange={(e) =>
                                        setReturnForm({
                                            ...returnForm,
                                            loan_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Choose a loan...</option>
                                    {loanSummary
                                        .filter((l) => !l.return_date)
                                        .map((loan) => (
                                            <option
                                                key={loan.loan_id}
                                                value={loan.loan_id}
                                            >
                                                Loan #{loan.loan_id} -{" "}
                                                {loan.member_name} -{" "}
                                                {loan.book_title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                            >
                                {loading ? "Processing..." : "Return Book"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Return;
