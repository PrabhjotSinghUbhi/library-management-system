-- Sample Data for Library Management System
-- Run this file AFTER running project.sql to populate the database with test data

USE library_management;

-- Sample Members
INSERT INTO members (name, email, phone, address)
VALUES
('John Doe', 'john@example.com', '1234567890', 'New Delhi'),
('Jane Smith', 'jane@example.com', '9876543210', 'Mumbai'),
('Alice Johnson', 'alice@example.com', '5555666777', 'Chandigarh'),
('Bob Williams', 'bob@example.com', '9999888777', 'Bangalore');

-- Sample Books
INSERT INTO books (title, author, publisher, year_published, isbn, total_copies, available_copies)
VALUES
('Introduction to DBMS', 'R. Elmasri', 'Pearson', 2018, '9780133970777', 3, 3),
('Computer Networks', 'Andrew Tanenbaum', 'Pearson', 2019, '9780132126953', 2, 2),
('Operating Systems', 'William Stallings', 'Pearson', 2020, '9780134670959', 4, 4),
('Data Structures', 'Mark Allen Weiss', 'Addison-Wesley', 2017, '9780132847377', 2, 2);

-- Sample data verification
SELECT 'Members Data:' AS Info;
SELECT * FROM members;

SELECT 'Books Data:' AS Info;
SELECT * FROM books;

-- Test issuing some books
CALL issue_book(1, 1, 14);  -- John Doe borrows Introduction to DBMS for 14 days
CALL issue_book(2, 2, 7);   -- Jane Smith borrows Computer Networks for 7 days

-- View loan summary
SELECT 'Current Loans:' AS Info;
SELECT * FROM loan_summary;