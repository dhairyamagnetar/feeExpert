package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.FeeDetail;
import com.dbmsproject.feexpert.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public class studentDAOImpl implements studentDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public boolean checkUserPassword(int userId, String password) {
        String sqlStatement = "select * from student where userId = ?";
        Student student = jdbcTemplate.queryForObject(sqlStatement, new Object[] {userId}, new BeanPropertyRowMapper<Student>(Student.class));
        assert student != null;
        return student.getPassword().equals(password);
    }

    @Override
    public List<Student> viewStudentWithScholarship() {
        String sqlStatement = "SELECT * FROM student WHERE scholarship > 0";
        return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<Student>(Student.class));
    }

    @Override
    public int addStudent(Student student) {
        String sqlStatement = "insert into student values (?,?,?,?,?,?,?,?,?)";
        return jdbcTemplate.update(sqlStatement, student.getStudentID(),student.getStudentName(),student.getUserId(), student.getPassword(),student.getSemesterId(),student.getBatchId(),student.getContact(),student.getAddress(),student.getScholarship());
    }

    @Override
    public int deleteStudent(int studentId) {
        String sqlStatement = "delete from student where studentID = ?";
        return jdbcTemplate.update(sqlStatement, studentId);
    }

    @Override
    public int updateStudent(Student student, int studentId) {
        String sqlStatement ="UPDATE student SET studentName = ?, userId = ?, password = ?, semesterId = ?, batchId = ?, contact = ?, address = ?, scholarship = ? WHERE studentID = ?";
        return jdbcTemplate.update(sqlStatement, student.getStudentName(),student.getUserId(), student.getPassword(),student.getSemesterId(),student.getBatchId(),student.getContact(),student.getAddress(),student.getScholarship(), studentId);
    }

    @Override
    public List<Student> getStudents() {
        String sqlStatement = "select * from student;";
        return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<Student>(Student.class));
    }

    @Override
    public Student getStudentById(int studentId) {
        String sqlStatement = "select * from student where studentID = ?";
        return jdbcTemplate.queryForObject(sqlStatement, new Object[] {studentId}, new BeanPropertyRowMapper<Student>(Student.class));
    }

    @Override
    public int getStudentIdByUserId(int userId) {
        String sqlStatement = "select studentID from student where userId = ?";
        return jdbcTemplate.queryForObject(sqlStatement, new Object[] {userId}, Integer.class);
    }

    @Override
    public List<Student> getStudentByBatchId(int batchId) {
        String sqlStatement = "select * from student where batchId = ?";
        return jdbcTemplate.query(sqlStatement, new Object[]{batchId}, new BeanPropertyRowMapper<Student>(Student.class));
    }

    @Override
    public boolean isFeePending(int studentId) {
        String sqlStatement = "select * from student s where s.studentID not in (select studentId from transaction_details td where td.semesterId = s.semesterId) and s.studentID = ?";
        List<Student> sid = jdbcTemplate.query(sqlStatement, new Object[] {studentId}, new BeanPropertyRowMapper<Student>(Student.class));
        return sid.size() != 0;
    }

    @Override
    public FeeDetail getFeeDetail(int studentId) {
        String sqlStatement = "SELECT s.studentID, s.studentName, s.batchId, s.semesterId, fs.messFee, fs.hostelFee, fs.tuitionFee, s.scholarship, (fs.hostelFee + fs.messFee + fs.tuitionFee - s.scholarship) AS totalFee FROM student s INNER JOIN feestructure fs ON s.batchId = fs.batchId where s.studentID = ?";
        return jdbcTemplate.queryForObject(sqlStatement, new Object[] {studentId}, new BeanPropertyRowMapper<FeeDetail>(FeeDetail.class));
    }

    @Override
    public List<Student> getLateFeeStudents() {
        String sqlStatement = "select * from student s where studentID not in ( select studentId from transaction_details td where td.semesterId = s.semesterId )";
        return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<Student>(Student.class));
    }
}
