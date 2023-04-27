-- Creating the database
CREATE DATABASE IF NOT EXISTS feedb1;

-- Switching to the database
USE feedb1;

-- Creating the student table
CREATE TABLE IF NOT EXISTS student (
    studentID INT PRIMARY KEY,
    studentName VARCHAR(255),
    userId INT,
    password VARCHAR(255),
    semesterId INT,
    batchId INT,
    contact VARCHAR(10),
    address VARCHAR(255),
    scholarship INT
);

-- Creating the Admin table
CREATE TABLE IF NOT EXISTS Admin (
    userId INT, 
    password VARCHAR(255)
);

-- Creating the Semester table
CREATE TABLE IF NOT EXISTS Semester (
    semesterId INT, 
    startDate DATE, 
    endDate DATE
);

-- Creating the FeeStructure table
CREATE TABLE IF NOT EXISTS FeeStructure (
    batchId INT,
    tuitionFee INT,
    hostelFee INT,
    messFee INT,
    PRIMARY KEY (batchId)
);

-- Creating the Transaction_details table
CREATE TABLE IF NOT EXISTS Transaction_details (
    studentId INT,
    transactionId INT PRIMARY KEY,
    semesterId INT,
    transactionDate DATE,
    paymentMode VARCHAR(25),
    feePaid INT,
    scholarship INT,
    CONSTRAINT fk_transaction_student FOREIGN KEY (studentId) REFERENCES student(studentID),
    CONSTRAINT unique_semester_student UNIQUE (semesterId, studentId)
);
