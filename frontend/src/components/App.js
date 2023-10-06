import { Route, Routes } from 'react-router-dom'
import AuthorizedContent from './AuthorizedContent';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import { AuthContext } from '../contexts/AuthContext';
import NoMatch from './NoMatch';

function App() {
  const [authorized, setAuthorized] = useState(localStorage.getItem('jwt'))

  return (
    <AuthContext.Provider value={setAuthorized}>
      <div className="page">
      <Routes>
        <Route path='/' element={<ProtectedRoute element={AuthorizedContent} loggedIn={authorized}/>}/>
        <Route path='/sign-up' element={<Register authorization={setAuthorized}/>}/>
        <Route path='/sign-in' element={<Login authorization={setAuthorized}/>} />
        <Route path='*' element={<NoMatch />}/>
      </Routes>
      </div>
    </AuthContext.Provider>
  )
}

export default App;
