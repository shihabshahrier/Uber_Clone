import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { DriverDataContext } from '../context/DriverContext'


const DriverSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [color, setColor] = useState('')
  const [plateNumber, setPlateNumber] = useState('')
  const [capacity, setCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  // const [driverData, setDriverData] = useState({})
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { driver, setDriver } = useContext(DriverDataContext)

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(firstName, lastName, email, password, color, plateNumber, capacity, vehicleType)
    const newDriver = {
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plateNumber: plateNumber,
        capacity: capacity,
        vehicleType: vehicleType
      }
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URl}/drivers/register`, newDriver)
      console.log(response)
      if(response.status === 201){
        const data = response.data
        setDriver(data.driver)
        localStorage.setItem("driver-token", data.token)
        navigate('/driver-home')
      } 
    }catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = {}
        error.response.data.errors.forEach(err => {
          backendErrors[err.path] = err.msg
        })
        console.log(backendErrors)
        setErrors(backendErrors)
      } else {
        console.error(error)
        // Optionally set a general error message
        setErrors({ general: 'An unexpected error occurred. Please try again.' })
      }
    }

    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setColor('')
    setPlateNumber('')
    setCapacity('')
    setVehicleType('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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

        <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>

        <div className="flex gap-2">
          <select 
          className="flex-1 bg-white mb-7 rounded px-4 py-2 border text-lg placeholder:text-base"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          required>
            <option value="">Select Vehicle Type</option>
            <option value="Car">Car</option>
            <option value="Moto">Moto</option>
            <option value="CNG">CNG</option>
          </select>
          
            <input
            className="w-28 bg-white mb-7 rounded px-4 py-2 border text-lg placeholder:text-base"
            type = "number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder = "Capacity"
            required />   
        </div>     

        <div className="flex gap-2">
          <input
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "text"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          placeholder = "Plate Number"
          required />

          <input
          className="bg-white mb-7 rounded px-4 py-2 border text-lg w-full placeholder:text-base"
          type = "text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder = "Color"
          required />
        </div>

          <button
          className = "bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 text-lg w-full placeholder:text-base"
          type = "submit">
            Register
          </button>
      </form>
    <p className='text-center'> Already a Rider! <Link to={"/driver-login"} className="text-blue-700">login</Link></p>
    </div>

    {/* <div>
      <Link
        to='/login'
        className='bg-[#247aca] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
      > signin as a User
      </Link>
    </div> */}
  </div>
  )
}

export default DriverSignup