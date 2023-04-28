package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.Semester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Repository
public class semesterDAOImpl implements semesterDAO{
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public int updateSemesterInfo(Semester sem, int semesterId) {
        try {
            String sqlStatement = "update semester set startDate = ?, endDate = ? where semesterId = ?";
            return jdbcTemplate.update(sqlStatement, sem.getStartDate(),sem.getEndDate(),semesterId);
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public int addSemesterInfo(Semester sem) {
        try {
            String sqlStatement = "insert into semester values (?,?,?)";
            return jdbcTemplate.update(sqlStatement, sem.getSemesterId(), sem.getStartDate(),sem.getEndDate());
        } catch (Exception e) {
            return -1;
        }
    }

    @Override
    public List<Semester> getSemesterInfo() {
        try {
            String sqlStatement = "select * from semester";
            return jdbcTemplate.query(sqlStatement, new BeanPropertyRowMapper<Semester>(Semester.class));
        } catch (DataAccessException e) {
            return Collections.emptyList();
        }
    }
}
