const LocationSearchPanel = ({setopenVehiclePanel, setShow}) => {

  const locations = [
    "banani super market",
    "gulshan 2",
    "dhanmondi 27",
    "uttara sector 7",
  ]

  const handleClick = () => {
    setopenVehiclePanel(true)
    setShow(false)
  }

  return (
    <div className="px-5">
      {locations.map((location, index) => (
      <div key={index} onClick={()=>handleClick()} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{location}</h4>
      </div>
      ))}
    </div>
  )

}

export default LocationSearchPanel