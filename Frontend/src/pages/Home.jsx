import { useState, useRef, useEffect } from 'react'
// import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [show, setShow] = useState(false)
  const panRef = useRef(null)
  const panRef2 = useRef(null)
  const arrowRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const ConfirmRideRef = useRef(null)
  const LookingForDriverRef = useRef(null)
  const WaitingForDriverRef = useRef(null)
  const [openVehiclePanel, setopenVehiclePanel] = useState(false)
  const [openConfirmRide, setopenConfirmRide] = useState(false)
  const [openLookingForDriver, setopenLookingForDriver] = useState(false)
  const [driverFound, setDriverFound] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(pickupLocation, destination)
  }

  useEffect(() => {
    if(show){
      gsap.to(panRef.current, {height: '70%'})
      gsap.to(panRef2.current, {top: '9%'})
      gsap.to(arrowRef.current, {opacity: 1})
    }else{
      gsap.to(panRef.current, {height: '0%'})
      gsap.to(panRef2.current, {top: '79%'})
      gsap.to(arrowRef.current, {opacity: 0})

    }
  }, [show])

  useEffect(() => {
    if(openVehiclePanel){
      gsap.to(vehiclePanelRef.current, {transform: 'translateY(0)'})
    }else{
      gsap.to(vehiclePanelRef.current, {transform: 'translateY(100%)'})
    }
  }, [openVehiclePanel])

  useEffect(() => {
    if(openConfirmRide){
      gsap.to(ConfirmRideRef.current, {transform: 'translateY(0)'})
    }else{
      gsap.to(ConfirmRideRef.current, {transform: 'translateY(100%)'})
    }
  }, [openConfirmRide])

  useEffect(() => {
    if(openLookingForDriver){
      gsap.to(LookingForDriverRef.current, {transform: 'translateY(0)'})
    }else{
      gsap.to(LookingForDriverRef.current, {transform: 'translateY(100%)'})
    }
  }, [openLookingForDriver])

  useEffect(() => {
    if(driverFound){
      gsap.to(WaitingForDriverRef.current, {transform: 'translateY(0)'})
    }else{
      gsap.to(WaitingForDriverRef.current, {transform: 'translateY(100%)'})
    }
  }, [driverFound])

  return (
    <div className="h-screen relative overflow-hidden">
      <img className='w-16 absolute left-5 top-5' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s" alt="" />
      
      <div className='h-screen w-screen'>
        <img className= "h-full w-full object-cover" src="https://i0.wp.com/www.medianama.com/wp-content/uploads/2018/06/Screenshot_20180619-112715.png.png?fit=493%2C383&ssl=1" alt="" />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="bg-white h-[30%] p-5">
        <h5 ref={arrowRef} onClick={()=>setShow(false)}className='absolute right-6 top-6 text-2xl opacity-0'><i className="ri-arrow-down-s-line"></i></h5>
        <h4 className="text-2xl font-semibold">Find a trip</h4>
            <form 
            onSubmit={(e) => 
            handleSubmit(e)}>
              <div ref = {panRef2} className='line absolute h-16 w-1 top-[79%] left-10 bg-gray-900 rounded-full'></div>
              <input 
              type="text" 
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-2 mt-2"
              onClick={() => setShow(true)}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)} 
              placeholder="Pick up location" />

              <input 
              type="text" 
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mb-2 mt-2"
              onClick={() => setShow(true)} 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination" />

            </form>
        </div>

        <div ref={panRef} className="bg-white h-[0%]">
              <LocationSearchPanel 
                setopenVehiclePanel = {setopenVehiclePanel}
                setShow = {setShow}
              
              />
        </div>
        <div ref={vehiclePanelRef} className= 'fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <VehiclePanel 
            setopenVehiclePanel = {setopenVehiclePanel}
            setopenConfirmRide = {setopenConfirmRide}
          />
        </div>
        <div ref={ConfirmRideRef} className= 'fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <ConfirmRide 
          setopenConfirmRide = {setopenConfirmRide}
          setopenVehiclePanel = {setopenVehiclePanel}
          setopenLookingForDriver = {setopenLookingForDriver}
          />
        </div>

        <div ref={LookingForDriverRef} className= 'fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <LookingForDriver
            setopenLookingForDriver = {setopenLookingForDriver}
          />
        </div>

        <div ref={WaitingForDriverRef} className= 'fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
          <WaitingForDriver/>
        </div>

      </div>    
    </div>
  )
}

export default Home