const Car = require('../models/Car');

exports.getAllCars = async (req, res, next) => {
    try {
        const cars = await Car.findAll();
        // console.log('Fetched cars:', cars);
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createCar = async (req, res, next) => {
    try {
        const { brand, model, year, generation, body_type, engine_type, transmission, drive_type } = req.body;
        const newCar = await Car.create({
            brand,
            model,
            year,
            generation,
            body_type,
            engine_type,
            transmission,
            drive_type
        });
        res.status(201).json(newCar);
    } catch (error) {
        console.error('Error creating car:', error);
        res.status(500).json({ message: 'Server error' });
    }
};