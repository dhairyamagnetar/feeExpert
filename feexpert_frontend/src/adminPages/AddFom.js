import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddForm() {
    const navigate = useNavigate();
    const [studentData, setStudentData] = useState({
        studentID: 0,
        studentName: "",
        batchId: 0,
        address: "",
        contact: "",
        semesterId: 0,
        scholarship: 0,
    });

    // To modify the student data whenever some data is filled in the form.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prevData) => ({ ...prevData, [name]: value }));
    };

    //Handles the sending request and receiving response part of submit event.
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("In handle submit");
        const sendPost = async () => {
            try {
                console.log(studentData);
                const response = await axios.post("http://localhost:8080/admin/students", studentData);
                console.log(response);
                console.log("No error");
                processResponse(response);
            } catch (error) {
                console.error(error);
            }
        };
        await sendPost();
    };

    // Handles redirecting based on the response.
    function processResponse(response) {
        if (response.data) {
            navigate("/admin/adminHome");
        } else {
            navigate("/error");
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Student</h1>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="studentId" className="form-label text-left">
                            Student ID
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="studentID"
                            name="studentID"
                            value={studentData.studentID}
                            onChange={handleChange}
                            placeholder="Enter student ID"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="studentName" className="form-label">
                            Student Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="studentName"
                            name="studentName"
                            value={studentData.studentName}
                            onChange={handleChange}
                            placeholder="Enter student name"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="studentBatch" className="form-label">
                            Student Batch
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="batchId"
                            name="batchId"
                            value={studentData.batchId}
                            onChange={handleChange}
                            placeholder="Enter student batch"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="address" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={studentData.address}
                            onChange={handleChange}
                            placeholder="Enter student address"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="contact" className="form-label">
                            Contact
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            name="contact"
                            value={studentData.contact}
                            onChange={handleChange}
                            placeholder="Enter student contact number"
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="semid" className="form-label">
                            Semester ID
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="semesterId"
                            name="semesterId"
                            value={studentData.semesterId}
                            onChange={handleChange}
                            placeholder="Enter student's semester ID"
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="scholarship" className="form-label">
                        Scholarship
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="scholarship"
                            name="scholarship"
                            value={studentData.scholarship}
                            onChange={handleChange}
                            placeholder="Enter scholarship"
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary pl-5 pr-5">
                    Add Student
                </button>
            </form>
        </div>
    );
};
        
export default AddForm;