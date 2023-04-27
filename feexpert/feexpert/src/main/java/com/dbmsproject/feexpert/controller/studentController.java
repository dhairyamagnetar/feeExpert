package com.dbmsproject.feexpert.controller;
import com.dbmsproject.feexpert.dao.feeStructureDAO;
import com.dbmsproject.feexpert.dao.transactionDAO;
import com.dbmsproject.feexpert.model.FeeDetail;
import com.dbmsproject.feexpert.model.Student;

import com.dbmsproject.feexpert.dao.studentDAO;
import com.dbmsproject.feexpert.model.Transaction;
import com.dbmsproject.feexpert.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class studentController {

    @Autowired
    studentDAO sDAO;

    @Autowired
    transactionDAO tranDAO;

    @Autowired
    feeStructureDAO feeDAO;

    @PostMapping("/student/login")
    public boolean login(@RequestBody User user) {
        return sDAO.checkUserPassword(user.getUserId(), user.getPassword());
    }

    @GetMapping("/student/userId/{userId}")
    public int getStudentIdByUserId(@PathVariable int userId) {
        return sDAO.getStudentIdByUserId(userId);
    }

    @GetMapping("/student/{studentId}")
    public Student getStudentById(@PathVariable int studentId) {
        return sDAO.getStudentById(studentId);
    }

    @GetMapping("/student/{studentId}/transactions")
    public List<Transaction> getTransactions(@PathVariable int studentId) {
        return tranDAO.viewTransactions(studentId);
    }

    @GetMapping("/student/{studentId}/transactions/{transactionId}")
    public Transaction getReceiptByTransactionId(@PathVariable int studentId, @PathVariable int transactionId) {
        return tranDAO.getReceiptByTransactionId(transactionId);
    }

    @GetMapping("/student/{studentId}/transactionBySem/{semesterId}")
    public Transaction getReceiptBySemesterId(@PathVariable("studentId") int studentId, @PathVariable("") int semesterId) {
        return tranDAO.getReceipt(studentId, semesterId);
    }

    @PostMapping("/student/{studentId}/transactions")
    public int addTransaction(@PathVariable int studentId, @RequestBody Transaction transaction) {
        return tranDAO.addTransaction(transaction);
    }

    @GetMapping("/student/{studentId}/feePayment")
    @ResponseBody
    public Object showFeeDetail(@PathVariable int studentId) {
        Map<String, Object> object = new HashMap<>();
        if (sDAO.isFeePending(studentId)) {
            FeeDetail feeDetail = sDAO.getFeeDetail(studentId);
            object.put("StudentId", feeDetail.getStudentID());
            object.put("StudentName", feeDetail.getStudentName());
            object.put("batchId", feeDetail.getBatchId());
            object.put("semesterId", feeDetail.getSemesterId());
            object.put("messFee",feeDetail.getMessFee());
            object.put("hostelFee", feeDetail.getHostelFee());
            object.put("tuitionFee", feeDetail.getTuitionFee());
            object.put("scholarship", feeDetail.getScholarship());
            object.put("totalFee", feeDetail.getTotalFee());
            object.put("status", "Unpaid");

        }
        else {
            object.put("studentId", studentId);
            object.put("status","Paid");
        }
        return object;
    }

    @GetMapping("/student/{studentId}/feeToPay")
    public int getFeeToPay(@PathVariable int studentId) {
        if (sDAO.isFeePending(studentId)) {
            return feeDAO.getFeeToPay(studentId);
        }
        return 0;
    }
}
