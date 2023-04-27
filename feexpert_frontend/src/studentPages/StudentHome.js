import { useContext } from "react";
import { MyContext } from "../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function StudentHome() {

    const [globalStudentId, setGlobalStudentId] = useContext(MyContext);
    console.log("focus on this : " + globalStudentId);

    const navigate = useNavigate();

    function handleSubmit1() {
        navigate("/student/studentInfo");
    }

    function handleSubmit2() {
        navigate("/student/studentTransaction");
    }

    function handleSubmit3() {
        navigate("/student/studentFeeDetail");
    }

    function handleSubmit4() {
        navigate("/student/studentReciept");
    }

    return (
        <div className="container mt-5 mb-5">
            <h1>Welcome to Student Portal</h1>
            <ul className="list-group mt-4">
                <li className="list-group-item">
                    <h4>Info</h4>
                    <p>View your personal information</p>
                    <a className="btn btn-primary" onClick={handleSubmit1} role="button">Go</a>
                </li>
                <li className="list-group-item">
                    <h4>Transaction Info</h4>
                    <p>View your transaction details</p>
                    <a className="btn btn-primary" onClick={handleSubmit2} role="button">Go</a>
                </li>
                <li className="list-group-item">
                    <h4>Fee detail</h4>
                    <p>View details for the fee to be paid</p>
                    <a className="btn btn-primary" onClick={handleSubmit3} role="button">Go</a>
                </li>
                <li className="list-group-item">
                    <h4>Pay Fees</h4>
                    <p>Pay your fees here</p>
                    <a href="pay.html" className="btn btn-primary">Go</a>
                </li>
                <li className="list-group-item">
                    <h4>Print Receipts</h4>
                    <p>Print your payment receipts</p>
                    <a className="btn btn-primary" onClick={handleSubmit4} role="button">Go</a>
                </li>
            </ul>
        </div>
    );
};

export default StudentHome;