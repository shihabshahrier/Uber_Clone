import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogout = () => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URl}/users/logout`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      if (response.status === 200) {
        setUser({})
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
    ).catch(err => {
      console.log(err)
    })
  }, [token, navigate, setUser])

  return (
    <div>Logout</div>
  )
}

export default UserLogout