import { Link } from "react-router-dom"
import { useState } from "react"

const Userlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(email, password)

    setUserData({
      email: email,
      password: password
    })
    console.log(userData)

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
      <p className='text-center'> Don&apos;t have an account? <Link to={"/signup"} className="text-blue-700">Create account</Link></p>
      </div>

      <div>
        <Link
          to='/driver-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        > signin as a driver
        </Link>
      </div>
    </div>

  )
}

export default Userlogin