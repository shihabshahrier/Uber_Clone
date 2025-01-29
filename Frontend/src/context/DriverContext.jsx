import { createContext, useState } from 'react';

export const DriverDataContext = createContext();

const DriverContext = ({ children }) => {
    const [ Driver, setDriver ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const updateDriver= (DriverData) => {
        setDriver(DriverData);
    };

    const value = {
        Driver,
        setDriver,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateDriver
    };

    return (
        <DriverDataContext.Provider value={value}>
            {children}
        </DriverDataContext.Provider>
    );
};

export default DriverContext;