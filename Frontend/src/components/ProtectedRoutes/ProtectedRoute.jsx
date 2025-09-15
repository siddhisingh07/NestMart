import {useContext } from 'react'
import { authContext } from '../../Context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {user, loading} = useContext(authContext)
    const location = useLocation();
 
    if (loading)return <p>Loading</p>

    if (!user) return <Navigate  to="/login" state= {{from : location}} replace/>

    return children
}

export default ProtectedRoute