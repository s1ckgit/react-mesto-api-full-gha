import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, ...props }) {
  return (
    props.loggedIn === true ? <Component {...props} /> : <Navigate to='/signin'/>
  );
}
