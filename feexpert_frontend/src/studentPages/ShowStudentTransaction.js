import ShowTransactions from "../adminPages/ShowTransactions";
import { useContext } from "react";
import { MyContext } from "../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function ShowStudentTransaction() {

    const [globalStudentId, setGlobalStudentId] = useContext(MyContext);

    const [transaction, setTransaction] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/student/${globalStudentId}/transactions`)
          .then(response => {
            setTransaction(response.data);
          })
          .catch(error => console.error(error));
      }, []);    

    return (
        <div>
            <ShowTransactions transactionData={transaction} />
        </div>
    );
}

export default ShowStudentTransaction;