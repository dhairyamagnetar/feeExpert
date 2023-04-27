package com.dbmsproject.feexpert.controller;

import com.dbmsproject.feexpert.dao.*;
import com.dbmsproject.feexpert.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class adminController {
    @Autowired
    studentDAO sDAO;
    @Autowired
    semesterDAO semDAO;
    @Autowired
    feeStructureDAO feeStructDAO;
    @Autowired
    transactionDAO transDAO;
    @Autowired
    adminDAO adDAO;

    @PostMapping("/admin/login")
    public boolean login(@RequestBody User user) {
        return adDAO.checkAdminPassword(user.getUserId(), user.getPassword());
    }

    @GetMapping("/admin/students")
    public List<Student> getAllStudent() {
        return sDAO.getStudents();
    }

    @PostMapping("/admin/students")
    public int addStudent(@RequestBody Student student) {
        return sDAO.addStudent(student);
    }

    @GetMapping("/admin/students/{studentId}")
    public Student getStudentById(@PathVariable int studentId) {
        return sDAO.getStudentById(studentId);
    }

    @PutMapping("/admin/students/{studentId}")
    public int updateStudentById(@RequestBody Student student, @PathVariable int studentId) {
        return sDAO.updateStudent(student,studentId);
    }

    @DeleteMapping("/admin/students/{studentId}")
    public int deleteStudentById(@PathVariable int studentId) {
        return sDAO.deleteStudent(studentId);
    }

    @GetMapping("/admin/students/pending")
    public List<Student> getStudentWithPendingFee() {
        return sDAO.getLateFeeStudents();
    }

    @GetMapping("/admin/students/batch/{batchId}")
    public List<Student> getStudentByBatchId(@PathVariable int batchId) {
        return sDAO.getStudentByBatchId(batchId);
    }

    @GetMapping("/admin/feeStructure")
    public List<FeeStructure> getAllFeeStructures() {
        return feeStructDAO.getFeeStructures();
    }

    @PostMapping("/admin/feeStructure")
    public int addFeeStructure(@RequestBody FeeStructure feeStructure) {
        return feeStructDAO.addFeeStructure(feeStructure);
    }

    @GetMapping("/admin/feeStructure/{batchId}")
    public FeeStructure getFeeStructureById(@PathVariable int batchId) {
        return feeStructDAO.getFeeStructureById(batchId);
    }

    @PutMapping("/admin/feeStructure/{batchId}")
    public int updateFeeStructure(@RequestBody FeeStructure feeStructure,@PathVariable("batchId") int batchId) {
        return feeStructDAO.updateFeeStructure(batchId,feeStructure);
    }

    @GetMapping("/admin/students/scholarship")
    public List<Student> getStudentWithScholarship() {
        return sDAO.viewStudentWithScholarship();
    }

    @GetMapping("/admin/transactions")
    public List<Transaction> getAllTransactions() {
        return transDAO.getAll();
    }

    @GetMapping("/admin/transactions/{transactionId}")
    public Transaction getTransactionByTransactionId(@PathVariable int transactionId) {
        return transDAO.getReceiptByTransactionId(transactionId);
    }

    @GetMapping("/admin/transactions/student/{studentId}")
    public List<Transaction> getTransactionsByStudentId(@PathVariable int studentId) {
        return transDAO.viewTransactions(studentId);
    }

    @GetMapping("/admin/semesters")
    public List<Semester> getSemesters() {
        return semDAO.getSemesterInfo();
    }

    @PostMapping("/admin/semesters")
    public int addSemester(@RequestBody Semester sem) {
        return semDAO.addSemesterInfo(sem);
    }

    @PutMapping("/admin/semesters/{batchId}")
    public int updateSemester(@RequestBody Semester sem,@PathVariable int batchId) {
        return semDAO.updateSemesterInfo(sem,batchId);
    }
}
