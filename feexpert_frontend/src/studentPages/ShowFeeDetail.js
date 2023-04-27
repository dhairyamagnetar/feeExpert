import ShowTransactions from "../adminPages/ShowTransactions";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ShowFeeDetail() {
  const [globalStudentId, setGlobalStudentId] = useContext(MyContext);
  const [fee, setFee] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/student/${globalStudentId}/feePayment`)
      .then((response) => {
        setData(response.data);
        const temp = [response.data];
        setFee(temp);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      {data ? (
        data.status === "Paid" ? (
          <div>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Student Id</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fee.map((feeInfo) => (
                            <tr key={feeInfo.studentId}>
                              <td>{feeInfo.studentId}</td>
                              <td>{feeInfo.status}</td>
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
        ) : (
          <div>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>Student Id</th>
                            <th>Name</th>
                            <th>BatchId</th>
                            <th>SemesterId</th>
                            <th>MessFee</th>
                            <th>HostelFee</th>
                            <th>TuitionFee</th>
                            <th>Scholarship</th>
                            <th>TotalFee</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fee.map((feeInfo) => (
                            <tr key={feeInfo.StudentId}>
                              <td>{feeInfo.StudentId}</td>
                              <td>{feeInfo.StudentName}</td>
                              <td>{feeInfo.batchId}</td>
                              <td>{feeInfo.semesterId}</td>
                              <td>{feeInfo.messFee}</td>
                              <td>{feeInfo.hostelFee}</td>
                              <td>{feeInfo.tuitionFee}</td>
                              <td>{feeInfo.scholarship}</td>
                              <td>{feeInfo.totalFee}</td>
                              <td>{feeInfo.status}</td>
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
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ShowFeeDetail;