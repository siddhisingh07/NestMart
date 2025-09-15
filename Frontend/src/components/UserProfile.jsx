import React, { useContext } from 'react'
import { authContext } from '../Context/AuthContext';

const UserProfile = () => {
    let {user} = useContext(authContext);
  return (
    <>
    <h1 className='text-3xl font-bold text-pink-300'>hey {user?.name}</h1>
    </>
  )
}

export default UserProfile