import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DeleteForm() {
    const navigate = useNavigate();
    const [studentId, setstudentId] = useState(0);


    // To modify the studentId whenever some data is filled in the form.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setstudentId(value);
    };


    //Handles the sending request and recieving response part of submit event.
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("In handle submit");
        const sendPost = async () => {
            try {
                console.log(studentId);
                const response = await axios.delete(`http://localhost:8080/admin/students/${studentId}`);
                console.log(response);
                console.log("No error");
                processResponse(response);
            } catch (error) {
                console.error(error);
            }
        }
        await sendPost();
    };


    // Handles redirecting based on the response.
    function processResponse(response) {
        if (response.data > 0) { navigate("/admin/adminHome"); }
        else { navigate("/error"); }
    }

    return (
        <div className="container mt-5">
            <h2>Delete Student</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="studentId">Student ID:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={studentId}
                        onChange={handleChange}
                        id="studentId"
                        name="studentId"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-danger">
                    Delete
                </button>
            </form>
        </div>
    );
}

export default DeleteForm;
