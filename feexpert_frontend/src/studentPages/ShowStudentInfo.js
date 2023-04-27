import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import { useEffect } from "react";

function ShowStudentInfo() {

    const [globalStudentId, setGlobalStudentId] = useContext(MyContext);
    console.log("the global is is : " + globalStudentId);
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/student/${globalStudentId}`)
          .then(response => {
            const data = response.data;
            const temp = [data];
            setStudent(temp);
          })
          .catch(error => console.error(error));
      }, []);    

    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Student Id</th>
                                        <th>BatchId </th>
                                        <th>Name</th>
                                        <th>Address</th>
                                        <th>Contact</th>
                                        <th>SemesterId</th>
                                        <th>Scholarship</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.map(stud_info => (
                                        <tr key={stud_info.studentID}>
                                            <td>{stud_info.studentID}</td>
                                            <td>{stud_info.batchId}</td>
                                            <td>{stud_info.studentName}</td>
                                            <td>{stud_info.address}</td>
                                            <td>{stud_info.contact}</td>
                                            <td>{stud_info.semesterId}</td>
                                            <td>{stud_info.scholarship}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowStudentInfo;