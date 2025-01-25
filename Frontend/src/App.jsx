import { Route, Routes } from "react-router-dom"
import Home  from "./pages/Home"
import Start from "./pages/Start"
import UserLogin  from "./pages/Userlogin"
import UserSignup from "./pages/UserSignUp"
import DriverLogin from "./pages/DriverLogin"
import DriverSignup from "./pages/DriverSignup"


const App = () => {
  return (
    <div>
      <Routes> 
        <Route path="/" element={<Start />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
      </Routes> 
    </div>
  )
}

export default App