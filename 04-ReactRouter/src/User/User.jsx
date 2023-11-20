import React from 'react'
import { useParams } from 'react-router-dom'


const User = () => {
  
  return (
    <div>User: {useParams().id}</div>
  )
}

export default User