package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.FeeDetail;
import com.dbmsproject.feexpert.model.Student;

import java.util.List;


public interface studentDAO {
    public boolean checkUserPassword(int userId, String password);

    public List<Student> viewStudentWithScholarship();

    public int addStudent(Student student);

    public int deleteStudent(int studentId);

    public int updateStudent(Student student, int studentId);

    public List<Student> getStudents();

    public Student getStudentById(int studentId);

    public int getStudentIdByUserId(int userId);

    public List<Student> getStudentByBatchId(int batchId);

    public boolean isFeePending(int studentId);

    public FeeDetail getFeeDetail(int studentId);

    public List<Student> getLateFeeStudents();
}
