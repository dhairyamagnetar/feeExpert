package com.dbmsproject.feexpert.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {
    private int studentId;

    private int semesterId;

    private String paymentMode;

    private int transactionId;

    private Date transactionDate;

    private int feePaid;

    private int scholarship;
}
