import React from "react";

function Members({
    activeTab,
    handleRegisterMember,
    memberForm,
    setMemberForm,
    loading,
    members,
}) {
    return (
        <div>
            {activeTab === "members" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Register Member
                            </h2>
                            <form
                                onSubmit={handleRegisterMember}
                                className="space-y-4"
                            >
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={memberForm.name}
                                    onChange={(e) =>
                                        setMemberForm({
                                            ...memberForm,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={memberForm.email}
                                    onChange={(e) =>
                                        setMemberForm({
                                            ...memberForm,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    value={memberForm.phone}
                                    onChange={(e) =>
                                        setMemberForm({
                                            ...memberForm,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                                <textarea
                                    placeholder="Address"
                                    value={memberForm.address}
                                    onChange={(e) =>
                                        setMemberForm({
                                            ...memberForm,
                                            address: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    rows="3"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                                >
                                    {loading
                                        ? "Registering..."
                                        : "Register Member"}
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                                Registered Members ({members.length})
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                ID
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Email
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Phone
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Joined
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {members.map((member) => (
                                            <tr
                                                key={member.member_id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="px-4 py-3 text-sm">
                                                    {member.member_id}
                                                </td>
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {member.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {member.email}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {member.phone}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {new Date(
                                                        member.membership_date
                                                    ).toLocaleDateString()}
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

export default Members;
