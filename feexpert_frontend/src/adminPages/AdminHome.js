import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminHome() {

  //these are the variables that can change. And as they are changing I have to change it at all the places where I have used them on display
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(0);

  
  //This will load the list of the students for the first time when its rendered.
  useEffect(() => {
    axios.get('http://localhost:8080/admin/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => console.error(error));
  }, []);


  // This will fetch the student by id from the server and set it in filtered students
  const handleFilter = async () => {
    axios.get(`http://localhost:8080/admin/students/${searchTerm}`)
      .then(response => {
        const data = response.data;
        const filterArray = [data];
        setFilteredStudents(filterArray);
      })
      .catch(error => console.error(error));
  };

  
  //Handles the reset case. In reset the filtered students is again set to all the students fetched initially.
  const handleReset = () => {
    setFilteredStudents(students);
    setSearchTerm(0);
  };


  // the jsx code
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Student List</h1>
      <div className="row mb-3">
        <div className="col">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="Search by ID"
              value={searchTerm}
              onChange={event => setSearchTerm(event.target.value)}
            />

            <div className="btn-group" role="group" aria-label="Basic example">
              <button className="btn btn-primary" onClick={handleFilter}> Go </button>
              <button className="btn btn-secondary" onClick={handleReset} > Reset </button>
            </div>

          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
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
        </div>
      </div>
    </div>
  );
}

export default AdminHome;