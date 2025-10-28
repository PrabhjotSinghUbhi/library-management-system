-- Drop Tables Script for Library Management System
-- This file drops all tables in the correct order to avoid foreign key constraint errors
-- Run this file to completely clean the database

USE library_management;

-- Drop triggers first
DROP TRIGGER IF EXISTS book_return_trigger;
DROP TRIGGER IF EXISTS book_issue_trigger;

-- Drop procedures
DROP PROCEDURE IF EXISTS issue_book;
DROP PROCEDURE IF EXISTS return_book;
DROP PROCEDURE IF EXISTS register_member;

-- Drop views
DROP VIEW IF EXISTS loan_summary;

-- Drop tables in reverse order of creation (to handle foreign key dependencies)
DROP TABLE IF EXISTS fines;
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS members;

-- Optional: Drop the entire database
-- DROP DATABASE IF EXISTS library_management;

-- Verification - show remaining tables (should be empty)
SHOW TABLES;