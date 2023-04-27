import { useState, useEffect } from 'react';
import axios from 'axios';

function Scholarship() {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Enter Student ID to search");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8080/admin/students/scholarship`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFilter = async () => {
    axios.get(`http://localhost:8080/admin/students/${searchTerm}`)
      .then(response => {
        const data = response.data;
        const filterArray = [data];
        setFilteredStudents(filterArray);
        setErrorMessage("");
      })
      .catch(error => {
        console.error(error);
        setFilteredStudents([]);
        setErrorMessage("No student found with the given ID.");
      });
  };

  const handleReset = () => {
    setFilteredStudents(students);
    setSearchTerm("Enter Student ID to search");
    setErrorMessage("");
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Student Scholarship Management</h1>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Search by student ID"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />
            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-primary" onClick={handleFilter}> Go </button>
              <button className="btn btn-secondary" onClick={handleReset} > Show all students </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {errorMessage ? (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Batch</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Semester</th>
                        <th>Scholarship</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map(student => (
                        <tr key={student.studentID}>
                          <td>{student.studentID}</td>
                          <td>{student.studentName}</td>
                          <td>{student.batchId}</td>
                          <td>{student.address}</td>
                          <td>{student.contact}</td>
                          <td>{student.semesterId}</td>
                          <td>{student.scholarship}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Scholarship;
