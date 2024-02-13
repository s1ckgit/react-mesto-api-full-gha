import { Route, Routes } from 'react-router-dom';
import AuthorizedContent from './AuthorizedContent';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';
import Register from './Register';
import Login from './Login';
import NoMatch from './NoMatch';

function App() {
  const [authorized, setAuthorized] = useState(JSON.parse(localStorage.getItem('authorized')));

  return (
      <div className="page">
      <Routes>
        <Route path='/' element={<ProtectedRoute element={AuthorizedContent} loggedIn={authorized}/>}/>
        <Route path='/signup' element={<Register authorization={setAuthorized}/>}/>
        <Route path='/signin' element={<Login authorization={setAuthorized}/>} />
        <Route path='*' element={<NoMatch />}/>
      </Routes>
      </div>
  );
}

export default App;
