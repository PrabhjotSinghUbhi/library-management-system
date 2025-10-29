import React from "react";

function Issue({
    activeTab,
    handleIssueBook,
    issueForm,
    setIssueForm,
    members,
    books,
    loading
}) {
    return (
        <div>
            {activeTab === "issue" && (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">
                            Issue Book to Member
                        </h2>
                        <form onSubmit={handleIssueBook} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Member
                                </label>
                                <select
                                    value={issueForm.member_id}
                                    onChange={(e) =>
                                        setIssueForm({
                                            ...issueForm,
                                            member_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Choose a member...</option>
                                    {members.map((member) => (
                                        <option
                                            key={member.member_id}
                                            value={member.member_id}
                                        >
                                            {member.name} (ID:{" "}
                                            {member.member_id})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Book
                                </label>
                                <select
                                    value={issueForm.book_id}
                                    onChange={(e) =>
                                        setIssueForm({
                                            ...issueForm,
                                            book_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Choose a book...</option>
                                    {books
                                        .filter((b) => b.available_copies > 0)
                                        .map((book) => (
                                            <option
                                                key={book.book_id}
                                                value={book.book_id}
                                            >
                                                {book.title} - Available:{" "}
                                                {book.available_copies}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Days
                                </label>
                                <input
                                    type="number"
                                    value={issueForm.due_days}
                                    onChange={(e) =>
                                        setIssueForm({
                                            ...issueForm,
                                            due_days: e.target.value,
                                        })
                                    }
                                    min="1"
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                            >
                                {loading ? "Issuing..." : "Issue Book"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Issue;
