import { useState, useEffect } from 'react';
import axios from 'axios';
import FeeStructure from './FeeStructure';

function ShowFeeStructure() {
  const [structures, setStructures] = useState([]);
  const [searchTerm, setSearchTerm] = useState(0);
  const [filteredStructures, setFilteredStructures] = useState([]);


  function fetchFeeStructure() {
    axios.get('http://localhost:8080/admin/feeStructure')
      .then(response => {
        setStructures(response.data);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchFeeStructure();
  }, []);


  const handleFilter = async() => {
    axios.get(`http://localhost:8080/admin/feeStructure/${searchTerm}`)
    .then(response => {
      const data = response.data;
      console.log(data);
      const filterArray = [data];
      setFilteredStructures(filterArray);
      console.log(filteredStructures);
    })
    .catch(error => console.error(error));
  };

  const handleReset = () => {
    setFilteredStructures(structures);
    setSearchTerm(0);
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-center mb-5">Fee Structure Management</h1>
      <h2 className="text-center mb-4">Fee structure list</h2>
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
                      <th>BatchId</th>
                      <th>Tuition fee</th>
                      <th>Hostel fee</th>
                      <th>Mess fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStructures.map(structure => (
                      <tr key={structure.batchId}>
                        <td>{structure.batchId}</td>
                        <td>{structure.tuitionFee}</td>
                        <td>{structure.hostelFee}</td>
                        <td>{structure.messFee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeeStructure fetchFeeStructure={fetchFeeStructure}/>

    </div>
  );
}

export default ShowFeeStructure;
