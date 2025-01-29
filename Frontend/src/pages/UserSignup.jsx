import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'


const UserSignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(firstName, lastName, email, password)
    const newUser = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }
    console.log(import.meta.env.VITE_BASE_URl)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URl}/users/register`, newUser)
    console.log(response)
    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem("token", data.token)
      navigate('/home')  
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
      <img className='w-16 mb-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
      <form 
      onSubmit={(e)=>
      {handleSubmit(e)}}>
        <h3 className="text-lg font-medium mb-2">Full Name</h3>
        <div className="flex gap-2">
          <input 
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder = "First Name"
          required />

          <input 
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "text" 
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder = "Last Name"
          required />
        </div>

        <h3 className="text-lg font-medium mb-2">Email</h3>
          <input 
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder = "john.doe@email.com" 
          required />

        <h3 className="text-lg font-medium mb-2" >Password</h3>

          <input 
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder = "Password" 
          required />

          <button
          className = "bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 text-lg w-full placeholder:text-base"
          type = "submit">
            Sign Up
          </button>
      </form>
    <p className='text-center'> Already have an account? <Link to={"/login"} className="text-blue-700">login</Link></p>
    </div>

    {/* <div>
      <Link
        to='/login'
        className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
      > login
      </Link>
    </div> */}
  </div>
  )
}

export default UserSignUp