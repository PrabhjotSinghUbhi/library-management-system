import React, { useState, useEffect } from "react";
import {
    Books,
    Fines,
    Footer,
    Issue,
    Loan,
    Members,
    Reservation,
    Return,
} from "./components";

const API_BASE = "http://localhost:5000";

function App() {
    const [activeTab, setActiveTab] = useState("books");
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loans, setLoans] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [fines, setFines] = useState([]);
    const [loanSummary, setLoanSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form states
    const [bookForm, setBookForm] = useState({
        title: "",
        author: "",
        publisher: "",
        year_published: "",
        isbn: "",
        total_copies: 1,
    });
    const [memberForm, setMemberForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const [issueForm, setIssueForm] = useState({
        member_id: "",
        book_id: "",
        due_days: 14,
    });
    const [returnForm, setReturnForm] = useState({
        loan_id: "",
    });
    const [reservationForm, setReservationForm] = useState({
        member_id: "",
        book_id: "",
    });

    // Fetch data functions
    const fetchBooks = async () => {
        try {
            const res = await fetch(`${API_BASE}/books`);
            const data = await res.json();
            setBooks(data);
        } catch (err) {
            setError("Failed to fetch books");
        }
    };

    const fetchMembers = async () => {
        try {
            const res = await fetch(`${API_BASE}/members`);
            const data = await res.json();
            setMembers(data);
        } catch (err) {
            setError("Failed to fetch members");
        }
    };

    const fetchLoans = async () => {
        try {
            const res = await fetch(`${API_BASE}/loans`);
            const data = await res.json();
            setLoans(data);
        } catch (err) {
            setError("Failed to fetch loans");
        }
    };

    const fetchLoanSummary = async () => {
        try {
            const res = await fetch(`${API_BASE}/loan-summary`);
            const data = await res.json();
            setLoanSummary(data);
        } catch (err) {
            setError("Failed to fetch loan summary");
        }
    };

    const fetchReservations = async () => {
        try {
            const res = await fetch(`${API_BASE}/reservations`);
            const data = await res.json();
            setReservations(data);
        } catch (err) {
            setError("Failed to fetch reservations");
        }
    };

    const fetchFines = async () => {
        try {
            const res = await fetch(`${API_BASE}/fines`);
            const data = await res.json();
            setFines(data);
        } catch (err) {
            setError("Failed to fetch fines");
        }
    };

    useEffect(() => {
        fetchBooks();
        fetchMembers();
        fetchLoans();
        fetchLoanSummary();
        fetchReservations();
        fetchFines();
    }, []);

    // Submit handlers
    const handleAddBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API_BASE}/books`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...bookForm,
                    available_copies: bookForm.total_copies,
                }),
            });
            if (res.ok) {
                setSuccess("Book added successfully!");
                setBookForm({
                    title: "",
                    author: "",
                    publisher: "",
                    year_published: "",
                    isbn: "",
                    total_copies: 1,
                });
                fetchBooks();
            }
        } catch (err) {
            setError("Failed to add book");
        }
        setLoading(false);
    };

    const handleRegisterMember = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(memberForm),
            });
            if (res.ok) {
                setSuccess("Member registered successfully!");
                setMemberForm({ name: "", email: "", phone: "", address: "" });
                fetchMembers();
            }
        } catch (err) {
            setError("Failed to register member");
        }
        setLoading(false);
    };

    const handleIssueBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API_BASE}/issue`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(issueForm),
            });
            if (res.ok) {
                setSuccess("Book issued successfully!");
                setIssueForm({ member_id: "", book_id: "", due_days: 14 });
                fetchBooks();
                fetchLoans();
                fetchLoanSummary();
            }
        } catch (err) {
            setError("Failed to issue book");
        }
        setLoading(false);
    };

    const handleReturnBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API_BASE}/return`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(returnForm),
            });
            if (res.ok) {
                setSuccess("Book returned successfully!");
                setReturnForm({ loan_id: "" });
                fetchBooks();
                fetchLoans();
                fetchLoanSummary();
                fetchFines();
            }
        } catch (err) {
            setError("Failed to return book");
        }
        setLoading(false);
    };

    const handleAddReservation = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API_BASE}/reservations`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationForm),
            });
            if (res.ok) {
                setSuccess("Reservation created successfully!");
                setReservationForm({ member_id: "", book_id: "" });
                fetchReservations();
            }
        } catch (err) {
            setError("Failed to create reservation");
        }
        setLoading(false);
    };

    const handlePayFine = async (fineId) => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const res = await fetch(`${API_BASE}/fines/${fineId}/pay`, {
                method: "PUT",
            });
            if (res.ok) {
                setSuccess("Fine paid successfully!");
                fetchFines();
            }
        } catch (err) {
            setError("Failed to pay fine");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                <div className="container mx-auto px-6 py-8">
                    <h1 className="text-4xl font-bold mb-2">
                        📚 Library Management System
                    </h1>
                    <p className="text-indigo-100">
                        Manage your library efficiently with modern technology
                    </p>
                </div>
            </header>

            {/* Alerts */}
            {error && (
                <div className="container mx-auto px-6 mt-4">
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                        <p className="font-medium">{error}</p>
                    </div>
                </div>
            )}
            {success && (
                <div className="container mx-auto px-6 mt-4">
                    <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded">
                        <p className="font-medium">{success}</p>
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <div className="container mx-auto px-6 mt-6">
                <div className="bg-white rounded-lg shadow-md p-2 flex flex-wrap gap-2">
                    {[
                        "books",
                        "members",
                        "issue",
                        "return",
                        "reservations",
                        "loans",
                        "fines",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                activeTab === tab
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Books Tab */}
                <Books
                    activeTab={activeTab}
                    bookForm={bookForm}
                    books={books}
                    handleAddBook={handleAddBook}
                    setBookForm={setBookForm}
                    loading={loading}
                />

                {/* Members Tab */}
                <Members
                    activeTab={activeTab}
                    handleRegisterMember={handleRegisterMember}
                    loading={loading}
                    memberForm={memberForm}
                    members={members}
                    setMemberForm={setMemberForm}
                />

                {/* Issue Book Tab */}
                <Issue
                    activeTab={activeTab}
                    books={books}
                    handleIssueBook={handleIssueBook}
                    issueForm={issueForm}
                    loading={loading}
                    members={members}
                    setIssueForm={setIssueForm}
                />

                {/* Return Book Tab */}
                <Return
                    activeTab={activeTab}
                    handleReturnBook={handleReturnBook}
                    loading={loading}
                    loanSummary={loanSummary}
                    returnForm={returnForm}
                    setReturnForm={setReturnForm}
                />

                {/* Reservations Tab */}
                <Reservation
                    activeTab={activeTab}
                    books={books}
                    handleAddReservation={handleAddReservation}
                    loading={loading}
                    members={members}
                    reservationForm={reservationForm}
                    reservations={reservations}
                    setReservationForm={setReservationForm}
                />

                {/* Loans Tab */}
                <Loan activeTab={activeTab} loanSummary={loanSummary} />

                {/* Fines Tab */}
                <Fines
                    activeTab={activeTab}
                    fines={fines}
                    handlePayFine={handlePayFine}
                />
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default App;
