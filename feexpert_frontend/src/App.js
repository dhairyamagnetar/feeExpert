import AdminNav from './adminPages/AdminNav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminHome from './adminPages/AdminHome';
import FeeStructure from './adminPages/FeeStructure';
import Scholarship from './adminPages/Scholarship';
import Transaction from './adminPages/Transaction';
import StudentHome from './studentPages/StudentHome';
import AddForm from './adminPages/AddFom';
import UpdateForm from './adminPages/UpdateFrom';
import DeleteForm from './adminPages/DeleteForm';
import Login from './Login';
import Error from './Error';
import ShowFeeStructure from './adminPages/ShowFeeStructure';
import { createContext, useState } from 'react';
import ShowStudentInfo from './studentPages/ShowStudentInfo';
import ShowStudentTransaction from './studentPages/ShowStudentTransaction';
import ShowFeeDetail from './studentPages/ShowFeeDetail';
import PrintReciepts from './studentPages/PrintReciepts';


export const MyContext = createContext();

function App() {

  const [globalStudentId, setGlobalStudentId] = useState(0);

  return (
    <MyContext.Provider value={[globalStudentId, setGlobalStudentId]}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />} />
            <Route path="/student/login" element={<Login />} />

            <Route path="/admin/*" element={<>
              <AdminNav />
              <Routes>
                <Route path="/editStudent" element={
                  <>
                    <DeleteForm />
                    <AddForm />
                    <UpdateForm />
                  </>
                } />
                <Route path="/adminHome" element={<AdminHome />} />
                <Route path="/feeStructure" element={
                  <>
                    <ShowFeeStructure />
                  </>
                }
                />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/transaction" element={<Transaction />} />
              </Routes>
            </>} />

            <Route path="/student/*" element={<>
              <Routes>
                <Route path="/studentHome" element={<StudentHome />} />
                <Route path="/studentInfo" element={<ShowStudentInfo />} />
                <Route path="/studentTransaction" element={<ShowStudentTransaction />} />
                <Route path="/studentFeeDetail" element={<ShowFeeDetail />} />
                <Route path="/studentReciept" element={<PrintReciepts />} />
              </Routes>
            </>} />

            <Route exact path="/" element={<Login />} />
          </Routes>

        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;