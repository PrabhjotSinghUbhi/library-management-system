CREATE DATABASE library_management;
USE library_management;

-- Members Table
CREATE TABLE members (
    member_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255),
    membership_date DATE DEFAULT (CURRENT_DATE)
);

-- Books Table 
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100),
    publisher VARCHAR(100),
    year_published YEAR,
    isbn VARCHAR(20) UNIQUE,
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    CONSTRAINT chk_available_copies CHECK (available_copies >= 0),
    CONSTRAINT chk_total_copies CHECK (available_copies <= total_copies)
);

-- Loans Table
CREATE TABLE loans (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    issue_date DATE DEFAULT (CURRENT_DATE),
    due_date DATE,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    CONSTRAINT chk_due_date CHECK (due_date > issue_date)
);

-- Reservations Table
CREATE TABLE reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT,
    book_id INT,
    reservation_date DATE DEFAULT (CURRENT_DATE),
    status ENUM('Active', 'Completed', 'Cancelled') DEFAULT 'Active',
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Fines Table
CREATE TABLE fines (
    fine_id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT,
    amount DECIMAL(6,2) DEFAULT 0.00,
    paid BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (loan_id) REFERENCES loans(loan_id)
);

-- Triggers for Book Availability and Fine Calculation
DELIMITER $$

-- Trigger when book is issued (INSERT into loans)
CREATE TRIGGER book_issue_trigger
AFTER INSERT ON loans
FOR EACH ROW
BEGIN
    UPDATE books
    SET available_copies = available_copies - 1
    WHERE book_id = NEW.book_id;
END$$

-- Trigger when book is returned (UPDATE loans with return_date)
CREATE TRIGGER book_return_trigger
AFTER UPDATE ON loans
FOR EACH ROW
BEGIN
    -- If book is returned 
    IF NEW.return_date IS NOT NULL AND OLD.return_date IS NULL THEN
        -- Increase available copies
        UPDATE books
        SET available_copies = available_copies + 1
        WHERE book_id = NEW.book_id;
        
        -- Calculate fine if returned late
        IF NEW.return_date > NEW.due_date THEN
            INSERT INTO fines (loan_id, amount)
            VALUES (NEW.loan_id, DATEDIFF(NEW.return_date, NEW.due_date) * 5.00);
        END IF;
    END IF;
END$$

DELIMITER ;

-- View for Easy Summary
CREATE VIEW loan_summary AS
SELECT 
    l.loan_id,
    m.name AS member_name,
    b.title AS book_title,
    l.issue_date,
    l.due_date,
    l.return_date,
    f.amount AS fine_amount,
    f.paid
FROM loans l
JOIN members m ON l.member_id = m.member_id
JOIN books b ON l.book_id = b.book_id
LEFT JOIN fines f ON l.loan_id = f.loan_id;

-- Procedures
DELIMITER $$

-- Issue Book Procedure
CREATE PROCEDURE issue_book(IN p_member_id INT, IN p_book_id INT, IN p_due_days INT)
BEGIN
    DECLARE available INT;

    -- Check available copies
    SELECT available_copies INTO available FROM books WHERE book_id = p_book_id;

    -- Issue the book
    INSERT INTO loans (member_id, book_id, due_date)
    VALUES (p_member_id, p_book_id, DATE_ADD(CURRENT_DATE, INTERVAL p_due_days DAY));
END$$

-- Return Book Procedure
CREATE PROCEDURE return_book(IN p_loan_id INT)
BEGIN
    UPDATE loans SET return_date = CURRENT_DATE WHERE loan_id = p_loan_id;
END$$

-- Register Member Procedure
CREATE PROCEDURE register_member(IN p_name VARCHAR(100), IN p_email VARCHAR(100), IN p_phone VARCHAR(15), IN p_address VARCHAR(255))
BEGIN
    INSERT INTO members (name, email, phone, address) VALUES (p_name, p_email, p_phone, p_address);
END$$

DELIMITER ;
