import React from "react";

function Reservation({
    activeTab,
    handleAddReservation,
    reservationForm,
    setReservationForm,
    loading,
    members,
    books,
    reservations,
}) {
    return (
        <div>
            {activeTab === "reservations" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Create Reservation
                            </h2>
                            <form
                                onSubmit={handleAddReservation}
                                className="space-y-4"
                            >
                                <select
                                    value={reservationForm.member_id}
                                    onChange={(e) =>
                                        setReservationForm({
                                            ...reservationForm,
                                            member_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Select Member...</option>
                                    {members.map((member) => (
                                        <option
                                            key={member.member_id}
                                            value={member.member_id}
                                        >
                                            {member.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={reservationForm.book_id}
                                    onChange={(e) =>
                                        setReservationForm({
                                            ...reservationForm,
                                            book_id: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                    <option value="">Select Book...</option>
                                    {books.map((book) => (
                                        <option
                                            key={book.book_id}
                                            value={book.book_id}
                                        >
                                            {book.title}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                                >
                                    {loading
                                        ? "Creating..."
                                        : "Create Reservation"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                All Reservations ({reservations.length})
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Member ID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Book ID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {reservations.map((reservation) => (
                                            <tr
                                                key={reservation.reservation_id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 text-sm">
                                                    {reservation.reservation_id}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {reservation.member_id}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {reservation.book_id}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {new Date(
                                                        reservation.reservation_date
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            reservation.status ===
                                                            "Active"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : reservation.status ===
                                                                  "Completed"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {reservation.status}
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

export default Reservation;
