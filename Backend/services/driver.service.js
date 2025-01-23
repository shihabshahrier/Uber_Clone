const driverModel = require('../models/driver.model');

module.exports.createDriver = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType}) => {
    try {
        const driver = await driverModel.create({ fullname: { firstname, lastname }, email, password, vehicle: { color, plateNumber: plate, capacity, vehicleType: vehicleType } });
        return driver;
    } catch (error) {
        throw new Error(error.message);
    }

    return driver;
}