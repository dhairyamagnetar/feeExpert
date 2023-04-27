package com.dbmsproject.feexpert.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeeDetail {
    private int studentID;

    private String studentName;

    private int batchId;

    private int semesterId;

    private int MessFee;

    private int hostelFee;

    private int tuitionFee;

    private int scholarship;

    private int totalFee;
}
