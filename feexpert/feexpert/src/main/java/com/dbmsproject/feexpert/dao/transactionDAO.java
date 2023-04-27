package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.Transaction;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface transactionDAO {
    public Transaction getReceipt(int studentId, int semesterId);
    public Transaction getReceiptByTransactionId(int transactionId);
    public List<Transaction> viewTransactions(int studentId);
    public int addTransaction(Transaction transaction);
    public List<Transaction> getAll();
}
