// src/App.js
import './App.css';
import EmployeeList from './pages/EmployeeList';
import EmployeeCreate from './pages/EmployeeCreate';
import EmployeeEdit from './pages/EmployeeEdit';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Register from './pages/Register';

function App() {
  return (
    <div className='font-mono'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<Dashboard />} />

        <Route path='/' element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path='/empcreate' element={
          <ProtectedRoute>
            <EmployeeCreate />
          </ProtectedRoute>
        } />
        <Route path='/emplist' element={
          <ProtectedRoute>
            <EmployeeList />
          </ProtectedRoute>
        }
        />
        <Route path='/empedit' element={
          <ProtectedRoute>
            <EmployeeEdit />
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App;
