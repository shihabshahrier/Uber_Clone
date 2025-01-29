import { useContext, useEffect, useState } from 'react'
import { DriverDataContext } from '../context/DriverContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DriverProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('driver-token')
    const navigate = useNavigate()
    const { driver, setDriver } = useContext(DriverDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/driver-login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URl}/drivers/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setDriver(response.data.driver)
                setIsLoading(false)
            }
        })
            .catch( err => {
                localStorage.removeItem('token')
                navigate('/driver-login')
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default DriverProtectWrapper