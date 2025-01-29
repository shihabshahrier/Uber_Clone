import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DriverDataContext } from '../context/DriverContext'
import { useContext } from 'react'


const DriverLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [driverData, setDriverData] = useState({})

    const navigate = useNavigate()
    const { driver, setDriver } = useContext(DriverDataContext)

  
    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log(email, password)
  
      const driver = {
        email: email,
        password: password
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URl}/drivers/login`, driver)

      if(response.status === 200){
        const data = response.data
        setDriver(data.driver)
        localStorage.setItem("driver-token", data.token)
        navigate('/driver-home')
  
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <form 
      onSubmit={(e)=>
      {handleSubmit(e)}}>

        <h3 className="text-lg font-medium mb-2">Email</h3>
          <input 
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder = "example@email.com" 
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
            Login
          </button>
      </form>
    <p className='text-center'> Join the ride! <Link to={"/driver-signup"} className="text-blue-700">Register as a driver</Link></p>
    </div>

    <div>
      <Link
        to='/login'
        className='bg-[#247aca] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
      > signin as a User
      </Link>
    </div>
  </div>
  )
}

export default DriverLogin