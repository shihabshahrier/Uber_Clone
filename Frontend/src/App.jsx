import { Route, Routes } from "react-router-dom"
import Home  from "./pages/Home"
import DriverHome from "./pages/DriverHome"
import Start from "./pages/Start"
import UserLogin  from "./pages/Userlogin"
import UserSignup from "./pages/UserSignUp"
import DriverLogin from "./pages/DriverLogin"
import DriverSignup from "./pages/DriverSignup"
import UserProtectWrapper from "./pages/UserProtectWrapper"
import DriverProtectWrapper from "./pages/DriverProtectWrapper"
import UserLogout from "./pages/UserLogout"
import DriverLogout from "./pages/DriverLogout"
import Riding from "./pages/Riding"


const App = () => {
  return (
    <div>
      <Routes> 
        <Route path="/" element={<Start />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
          } />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/users/logout" element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
            } />
            
        <Route path="/riding" element={
          <UserProtectWrapper>
            <Riding />
          </UserProtectWrapper>
        } />

        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route path="/driver-home" element={
          <DriverProtectWrapper>
            <DriverHome />
          </DriverProtectWrapper>
        } />
        <Route path="/driver/logout" element={<DriverLogout />} />

      </Routes> 


    </div>
  )
}

export default App