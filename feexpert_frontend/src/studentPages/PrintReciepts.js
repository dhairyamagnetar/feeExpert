import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowTransactions from "../adminPages/ShowTransactions";
import { MyContext } from "../App";
import { useContext } from "react";

function PrintReciepts() {

    const [globalStudentId, setGlobalStudentId] = useContext(MyContext);

    const navigate = useNavigate();
    const [transactionId, setTransactionId] = useState(0);
    const [studentId, setStudentId] = useState(0);
    const [transactions1, setTransactions1] = useState([]);
    const [transactions2, setTransactions2] = useState([]);


    //Handles the sending request and receiving response part of submit event.
    const handleSubmit1 = async (e) => {
        e.preventDefault();
        console.log("In handle submit1");
        const sendPost = async () => {
            try {
                console.log(transactionId);
                const response = await axios.get(`http://localhost:8080/student/${globalStudentId}/transactionBySem/${studentId}`);
                console.log(response);
                const data = response.data;
                const transactionArray = [data];
                setTransactions1(transactionArray);
            } catch (error) {
                console.error(error);
            }
        };
        await sendPost();
    };

    //Handles the sending request and receiving response part of submit event.
    const handleSubmit2 = async (e) => {
        e.preventDefault();
        console.log("In handle submit1");
        // const response2 = await axios.get(`http://localhost:8080/student/${globalStudentId}`);
        // const semesterId = response2.data.semesterId;
        const sendPost = async () => {
            try {
                console.log(transactionId);
                const response = await axios.get(`http://localhost:8080/student/${globalStudentId}/transactions/${transactionId}`);
                console.log(response);
                const data = response.data;
                const transactionArray = [data];
                setTransactions2(transactionArray);
                console.log("No error");
            } catch (error) {
                console.error(error);
            }
        };
        await sendPost();
    };


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="management-heading">Reciepts</div>
                    <div className="form-box">
                        <h2>Using semester Id</h2>
                        <form onSubmit={handleSubmit1}>
                            <div className="form-group">
                                <label htmlFor="transactionID">Semester Id</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Semester ID"
                                    value={studentId}
                                    onChange={event => setStudentId(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-dark btn-block">Get Reciepts</button>
                        </form>
                        <ShowTransactions transactionData={transactions1} />
                    </div>
                    <div className="form-box">
                        <h2>Using Transaction Id</h2>
                        <form onSubmit={handleSubmit2}>
                            <div className="form-group">
                                <label htmlFor="studentID">Transaction Id</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Transaction ID"
                                    value={transactionId}
                                    onChange={event => setTransactionId(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-dark btn-block">Get Reciepts</button>
                        </form>
                        <ShowTransactions transactionData={transactions2} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrintReciepts;