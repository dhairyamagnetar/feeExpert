package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.FeeStructure;
import com.dbmsproject.feexpert.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class feeStructureDAOImpl implements feeStructureDAO{

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int getTotalFee(String batchId) {
        String sqlStatement = "select * from feestructure where batchId = ?";
        FeeStructure feeStructure = jdbcTemplate.queryForObject(sqlStatement, new Object[] {batchId}, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
        assert feeStructure != null;
        return feeStructure.getHostelFee() + feeStructure.getMessFee() + feeStructure.getTuitionFee();
    }

    @Override
    public int getFeeToPay(int studentId) {
        String sqlStatement = "select * from student where studentID = ?";
        Student student = jdbcTemplate.queryForObject(sqlStatement, new Object[] {studentId}, new BeanPropertyRowMapper<Student>(Student.class));
        assert student != null;
        sqlStatement = "select * from feestructure where batchId = ?";
        FeeStructure feeStructure = jdbcTemplate.queryForObject(sqlStatement, new Object[] {student.getBatchId()}, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
        assert feeStructure != null;
        return feeStructure.getHostelFee() + feeStructure.getMessFee() + feeStructure.getTuitionFee() - student.getScholarship();
    }

    @Override
    public List<FeeStructure> getFeeStructures() {
        String sqlStatement = "select * from feestructure";
        return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
    }

    @Override
    public FeeStructure getFeeStructureById(int batchId) {
        String sqlStatement = "select * from feestructure where batchId = ?";
        return jdbcTemplate.queryForObject(sqlStatement, new Object[] {batchId}, new BeanPropertyRowMapper<FeeStructure>(FeeStructure.class));
    }

    @Override
    public int updateFeeStructure(int id, FeeStructure feeStructure) {
        String sqlStatement = "update feestructure set tuitionFee = ?, hostelFee = ?, messFee = ? where batchId = ?";
        return jdbcTemplate.update(sqlStatement, feeStructure.getTuitionFee(), feeStructure.getHostelFee(), feeStructure.getMessFee(), id);
    }

    @Override
    public int addFeeStructure(FeeStructure feeStructure) {
        String sqlStatement = "insert into feestructure values (?,?,?,?)";
        return jdbcTemplate.update(sqlStatement, feeStructure.getBatchId(),feeStructure.getTuitionFee(),feeStructure.getHostelFee(),feeStructure.getMessFee());
    }
}
