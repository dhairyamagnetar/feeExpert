package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class adminDAOImpl implements adminDAO{
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Override
    public boolean checkAdminPassword(int userId, String password) {
        try {
            String sqlStatement = "select * from admin where userId = ?";
            Admin admin = jdbcTemplate.queryForObject(sqlStatement, new Object[] {userId}, new BeanPropertyRowMapper<Admin>(Admin.class));
            assert admin != null;
            return admin.getPassword().equals(password);
        } catch (Exception e) {
            return false;
        }
    }
}
