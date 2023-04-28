package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.FeeStructure;
import com.dbmsproject.feexpert.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;

@Repository
public class feeStructureDAOImpl implements feeStructureDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int getTotalFee(String batchId) {
        try {
            String sqlStatement = "select * from feestructure where batchId = ?";
            FeeStructure feeStructure = jdbcTemplate.queryForObject(sqlStatement, new Object[] {batchId}, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
            assert feeStructure != null;
            return feeStructure.getHostelFee() + feeStructure.getMessFee() + feeStructure.getTuitionFee();
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public int getFeeToPay(int studentId) {
        try {
            String sqlStatement = "select * from student where studentID = ?";
            Student student = jdbcTemplate.queryForObject(sqlStatement, new Object[] {studentId}, new BeanPropertyRowMapper<Student>(Student.class));
            assert student != null;
            sqlStatement = "select * from feestructure where batchId = ?";
            FeeStructure feeStructure = jdbcTemplate.queryForObject(sqlStatement, new Object[] {student.getBatchId()}, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
            assert feeStructure != null;
            return feeStructure.getHostelFee() + feeStructure.getMessFee() + feeStructure.getTuitionFee() - student.getScholarship();
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public List<FeeStructure> getFeeStructures() {
        try {
            String sqlStatement = "select * from feestructure";
            return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
        } catch (Exception e) {
            return Collections.emptyList();
        }
    }

    @Override
    public FeeStructure getFeeStructureById(int batchId) {
        try {
            String sqlStatement = "select * from feestructure where batchId = ?";
            FeeStructure feeStructure = jdbcTemplate.queryForObject(sqlStatement, new Object[] {batchId}, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
            assert feeStructure!=null;
            return feeStructure;
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public int updateFeeStructure(int id, FeeStructure feeStructure) {
        try {
            String sqlStatement = "update feestructure set tuitionFee = ?, hostelFee = ?, messFee = ? where batchId = ?";
            return jdbcTemplate.update(sqlStatement, feeStructure.getTuitionFee(), feeStructure.getHostelFee(), feeStructure.getMessFee(), id);
        } catch (DataAccessException e) {
            return -1;
        }
    }

    @Override
    public int addFeeStructure(FeeStructure feeStructure) {
        try {
            String sqlStatement = "insert into feestructure values (?,?,?,?)";
            return jdbcTemplate.update(sqlStatement, feeStructure.getBatchId(),feeStructure.getTuitionFee(),feeStructure.getHostelFee(),feeStructure.getMessFee());
        } catch (DataAccessException e) {
            return -1;
        }
    }
}
