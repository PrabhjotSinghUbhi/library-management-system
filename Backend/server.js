import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ================================
// GET REQUESTS (READ OPERATIONS)
// ================================

// Test route
app.get("/", (req, res) => {
      res.send("📚 Library Management System Backend Running...");
});

// Get all books
app.get("/books", async (req, res) => {
      console.log("GET /books - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM books");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all loans
app.get("/loans", async (req, res) => {
      console.log("GET /loans - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM loans");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get loan summary view
app.get("/loan-summary", async (req, res) => {
      console.log("GET /loan-summary - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM loan_summary");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all members
app.get("/members", async (req, res) => {
      console.log("GET /members - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM members");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all reservations
app.get("/reservations", async (req, res) => {
      console.log("GET /reservations - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM reservations");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Get all fines
app.get("/fines", async (req, res) => {
      console.log("GET /fines - Processing request...");
      try {
            const [rows] = await pool.query("SELECT * FROM fines");
            res.json(rows);
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// =================================
// POST REQUESTS (CREATE OPERATIONS)
// =================================

// Add new member
app.post("/members", async (req, res) => {
      console.log("POST /members - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const name = req.body?.name || req.query?.name;
      const email = req.body?.email || req.query?.email;
      const phone = req.body?.phone || req.query?.phone;
      const address = req.body?.address || req.query?.address;
      
      console.log("Final values:", { name, email, phone, address });
      try {
            const [result] = await pool.query(
                  "INSERT INTO members (name, email, phone, address) VALUES (?, ?, ?, ?)",
                  [name, email, phone, address]
            );
            res.json({ message: "Member added", member_id: result.insertId });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Add new book
app.post("/books", async (req, res) => {
      console.log("POST /books - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const title = req.body?.title || req.query?.title;
      const author = req.body?.author || req.query?.author;
      const publisher = req.body?.publisher || req.query?.publisher;
      const year_published = req.body?.year_published || req.query?.year_published;
      const isbn = req.body?.isbn || req.query?.isbn;
      const total_copies = req.body?.total_copies || req.query?.total_copies || 1;
      const available_copies = req.body?.available_copies || req.query?.available_copies || total_copies;
      
      console.log("Final values:", { title, author, publisher, year_published, isbn, total_copies, available_copies });
      try {
            const [result] = await pool.query(
                  "INSERT INTO books (title, author, publisher, year_published, isbn, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  [title, author, publisher, year_published, isbn, total_copies, available_copies]
            );
            res.json({ message: "Book added", book_id: result.insertId });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Add new reservation
app.post("/reservations", async (req, res) => {
      console.log("POST /reservations - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const member_id = req.body?.member_id || req.query?.member_id;
      const book_id = req.body?.book_id || req.query?.book_id;
      const status = req.body?.status || req.query?.status || 'Active';
      
      console.log("Final values:", { member_id, book_id, status });
      try {
            const [result] = await pool.query(
                  "INSERT INTO reservations (member_id, book_id, status) VALUES (?, ?, ?)",
                  [member_id, book_id, status]
            );
            res.json({ message: "Reservation added", reservation_id: result.insertId });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

// Issue book via stored procedure
app.post("/issue", async (req, res) => {
      console.log("POST /issue - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const member_id = req.body?.member_id || req.query?.member_id;
      const book_id = req.body?.book_id || req.query?.book_id;
      const due_days = req.body?.due_days || req.query?.due_days;
      
      console.log("Final values:", { member_id, book_id, due_days });
      try {
            const [rows] = await pool.query("CALL issue_book(?, ?, ?)", [
                  member_id,
                  book_id,
                  due_days,
            ]);
            res.json(rows[0]); // Returns message from procedure
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error issuing book" });
      }
});

// Return book via stored procedure
app.post("/return", async (req, res) => {
      console.log("POST /return - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const loan_id = req.body?.loan_id || req.query?.loan_id;
      
      console.log("Final values:", { loan_id });
      try {
            const [rows] = await pool.query("CALL return_book(?)", [loan_id]);
            res.json({ message: "Book returned successfully", loan_id });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error returning book" });
      }
});

// Register member via stored procedure
app.post("/register", async (req, res) => {
      console.log("POST /register - Processing request...");
      console.log("Body data:", req.body);
      console.log("Query data:", req.query);
      
      // Accept data from either body or query parameters
      const name = req.body?.name || req.query?.name;
      const email = req.body?.email || req.query?.email;
      const phone = req.body?.phone || req.query?.phone;
      const address = req.body?.address || req.query?.address;
      
      console.log("Final values:", { name, email, phone, address });
      try {
            const [rows] = await pool.query("CALL register_member(?, ?, ?, ?)", [
                  name, email, phone, address
            ]);
            res.json({ message: "Member registered successfully" });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Error registering member" });
      }
});

// ================================
// PUT REQUESTS (UPDATE OPERATIONS)
// ================================

// Update fine payment status
app.put("/fines/:fine_id/pay", async (req, res) => {
      console.log("PUT /fines/:fine_id/pay - Processing request...");
      console.log("Params:", req.params);
      
      const fine_id = req.params.fine_id;
      
      console.log("Final values:", { fine_id });
      try {
            const [result] = await pool.query(
                  "UPDATE fines SET paid = TRUE WHERE fine_id = ?",
                  [fine_id]
            );
            res.json({ message: "Fine marked as paid", fine_id });
      } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Server error" });
      }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
