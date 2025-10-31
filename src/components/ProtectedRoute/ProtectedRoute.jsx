import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ProtectedRoute({ children }) {
  const { userLogin } = useContext(UserContext);

  if (userLogin) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}