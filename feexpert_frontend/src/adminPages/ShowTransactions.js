function ShowTransactions({transactionData}) {

    return (
        <div className="row">
            <div className="col">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>TransactionID</th>
                                        <th>StudentId</th>
                                        <th>SemesterId</th>
                                        <th>Payment mode</th>
                                        <th>transaction date</th>
                                        <th>fee paid</th>
                                        <th>scholarship</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactionData.map(transaction => (
                                        <tr key={transaction.transactionId}>
                                            <td>{transaction.transactionId}</td>
                                            <td>{transaction.studentId}</td>
                                            <td>{transaction.semesterId}</td>
                                            <td>{transaction.paymentMode}</td>
                                            <td>{transaction.transactonDate}</td>
                                            <td>{transaction.feePaid}</td>
                                            <td>{transaction.scholarship}</td>
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

export default ShowTransactions;