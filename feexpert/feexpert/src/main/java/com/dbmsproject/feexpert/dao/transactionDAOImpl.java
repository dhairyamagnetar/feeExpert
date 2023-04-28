package com.dbmsproject.feexpert.dao;


import com.dbmsproject.feexpert.model.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class transactionDAOImpl implements transactionDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public Transaction getReceipt(int studentId, int semesterId) {
        try {
            String sqlStatement = "select * from transaction_details where studentId = ? and semesterId = ?";
            Transaction transaction = jdbcTemplate.queryForObject(sqlStatement, new Object[] {studentId,semesterId}, new BeanPropertyRowMapper<Transaction>(Transaction.class));
            assert transaction!=null;
            return transaction;
        } catch (Exception e) {
            return new Transaction();
        }
    }

    @Override
    public Transaction getReceiptByTransactionId(int transactionId) {
        try {
            String sqlStatement = "select * from transaction_details where transactionId = ?";
            return jdbcTemplate.queryForObject(sqlStatement, new Object[] {transactionId}, new BeanPropertyRowMapper<Transaction>(Transaction.class));
        } catch (Exception e) {
            return new Transaction();
        }
    }

    @Override
    public List<Transaction> viewTransactions(int studentId) {
        try {
            String sqlStatement = "select * from transaction_details where studentId = ?";
            return jdbcTemplate.query(sqlStatement,new Object[]{studentId}, new BeanPropertyRowMapper<Transaction>(Transaction.class));
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    @Override
    public int addTransaction(Transaction transaction) {
        try {
            String sqlStatement = "insert into transaction_details values (?,?,?,?,?,?,?)";
            return jdbcTemplate.update(sqlStatement, transaction.getStudentId(),transaction.getTransactionId(),transaction.getSemesterId(),transaction.getTransactionDate(),transaction.getPaymentMode(),transaction.getFeePaid(),transaction.getScholarship());
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public List<Transaction> getAll() {
        try {
            String sqlStatement = "select * from transaction_details";
            return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<Transaction>(Transaction.class));
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }
}
