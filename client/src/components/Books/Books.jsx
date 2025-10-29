import React from "react";

function Books({
    activeTab,
    handleAddBook,
    bookForm,
    setBookForm,
    loading,
    books,
}) {
    return (
        <div>
            {activeTab === "books" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Add New Book
                            </h2>
                            <form
                                onSubmit={handleAddBook}
                                className="space-y-4"
                            >
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={bookForm.title}
                                    onChange={(e) =>
                                        setBookForm({
                                            ...bookForm,
                                            title: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={bookForm.author}
                                    onChange={(e) =>
                                        setBookForm({
                                            ...bookForm,
                                            author: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Publisher"
                                    value={bookForm.publisher}
                                    onChange={(e) =>
                                        setBookForm({
                                            ...bookForm,
                                            publisher: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Year Published"
                                    value={bookForm.year_published}
                                    onChange={(e) =>
                                        setBookForm({
                                            ...bookForm,
                                            year_published: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="ISBN"
                                    value={bookForm.isbn}
                                    onChange={(e) =>
                                        setBookForm({
                                            ...bookForm,
                                            isbn: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="number"
                                    placeholder="Total Copies"
                                    value={bookForm.total_copies}
                                    onChange={(e) =>
                                        setBookForm({
                                            ...bookForm,
                                            total_copies: e.target.value,
                                        })
                                    }
                                    min="1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                                >
                                    {loading ? "Adding..." : "Add Book"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Books Collection ({books.length})
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Title
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Author
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ISBN
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Available
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {books.map((book) => (
                                            <tr
                                                key={book.book_id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 text-sm">
                                                    {book.book_id}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {book.title}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {book.author}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {book.isbn}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            book.available_copies >
                                                            0
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {book.available_copies}/
                                                        {book.total_copies}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Books;
