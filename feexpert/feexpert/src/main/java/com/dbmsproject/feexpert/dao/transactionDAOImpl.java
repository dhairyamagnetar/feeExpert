package com.dbmsproject.feexpert.dao;


import com.dbmsproject.feexpert.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class transactionDAOImpl implements transactionDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Transaction getReceipt(int studentId, int semesterId) {
        String sqlStatement = "select * from transaction_details where studentId = ? and semesterId = ?";
        return jdbcTemplate.queryForObject(sqlStatement, new Object[] {studentId,semesterId}, new BeanPropertyRowMapper<Transaction>(Transaction.class));
    }

    @Override
    public Transaction getReceiptByTransactionId(int transactionId) {
        String sqlStatement = "select * from transaction_details where transactionId = ?";
        return jdbcTemplate.queryForObject(sqlStatement, new Object[] {transactionId}, new BeanPropertyRowMapper<Transaction>(Transaction.class));
    }

    @Override
    public List<Transaction> viewTransactions(int studentId) {
        String sqlStatement = "select * from transaction_details where studentId = ?";
        return jdbcTemplate.query(sqlStatement,new Object[]{studentId}, new BeanPropertyRowMapper<Transaction>(Transaction.class));
    }

    @Override
    public int addTransaction(Transaction transaction) {
        String sqlStatement = "insert into transaction_details values (?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sqlStatement, transaction.getStudentId(),transaction.getTransactionId(),transaction.getSemesterId(),transaction.getTransactionDate(),transaction.getPaymentMode(),transaction.getFeePaid(),transaction.getScholarship());
    }

    @Override
    public List<Transaction> getAll() {
        String sqlStatement = "select * from transaction_details";
        return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<Transaction>(Transaction.class));
    }
}
