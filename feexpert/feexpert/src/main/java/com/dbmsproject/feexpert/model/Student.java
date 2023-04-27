package com.dbmsproject.feexpert.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student extends User{
    private int studentID;

    private String studentName;

    private int batchId;

    private String address;

    private String contact;

    private int semesterId;

    private int scholarship;
}
