import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShowTransactions from "./ShowTransactions";

function Transaction() {

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
                const response = await axios.get(`http://localhost:8080/admin/transactions/${transactionId}`);
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
        const sendPost = async () => {
            try {
                console.log(transactionId);
                const response = await axios.get(`http://localhost:8080/admin/transactions/student/${studentId}`);
                console.log(response);
                setTransactions2(response.data);
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
                    <div className="management-heading">Transaction Management</div>
                    <div className="form-box">
                        <h2>Using Transaction ID</h2>
                        <form onSubmit={handleSubmit1}>
                            <div className="form-group">
                                <label htmlFor="transactionID">Transaction ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter transaction ID"
                                    value={transactionId}
                                    onChange={event => setTransactionId(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-dark btn-block">Get Transaction</button>
                        </form>
                        <ShowTransactions transactionData={transactions1} />
                    </div>
                    <div className="form-box">
                        <h2>Using Student ID</h2>
                        <form onSubmit={handleSubmit2}>
                            <div className="form-group">
                                <label htmlFor="studentID">Student ID</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Student ID"
                                    value={studentId}
                                    onChange={event => setStudentId(event.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-dark btn-block">Get Transaction</button>
                        </form>
                        <ShowTransactions transactionData={transactions2} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transaction;