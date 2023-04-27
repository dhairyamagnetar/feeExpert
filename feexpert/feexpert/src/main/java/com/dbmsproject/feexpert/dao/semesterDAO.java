package com.dbmsproject.feexpert.dao;

import com.dbmsproject.feexpert.model.Semester;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface semesterDAO {

    public int updateSemesterInfo(Semester sem, int semesterId);
    public int addSemesterInfo(Semester sem);
    public List<Semester> getSemesterInfo();

}
