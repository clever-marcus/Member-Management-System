import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import EmployeeManagementApp from './Components/EmployeeManagementApp.jsx';
import EmployeeDetails from './Components/MemberDetails.jsx';
import Login from './pages/Login/Login.jsx';
import Signup from './pages/SignUp/Signup.jsx';



const App = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>

    </div>
  )
  
}

export default App;
