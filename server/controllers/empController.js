const Employee = require("../models/empModel");
const mongoose = require("mongoose");

module.exports.createEmployee = async (req, res, next) => {
    try {
        const { name, phonenumber, email, gender, designation, courses } = req.body;
        

        // Check for duplicates
        const existingEmployee = await Employee.findOne({ 
            $or: [{ phonenumber }, { email }] 
        });

        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee with this phone number or email already exists' });
        }

        const imageFile = req.file ? req.file.path : null;
        const joinedDate = Date.now();

        const newEmployee = new Employee({
            name,
            phonenumber,
            email,
            gender,
            designation,
            courses,
            imageFile,
            joinedDate,
        });

        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error });
    }
};

module.exports.editEmployee = async (req, res, next) => {
    try {
        const { _id, name, phonenumber, email, gender, designation, courses } = req.body;
        const imageFile = req.file ? req.file.path : null;
        const updateData = { name, phonenumber, email, gender, designation, courses };
        if (imageFile) updateData.imageFile = imageFile;

        const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(updatedEmployee);
    } catch (err) {
        next(err);
    }
};

module.exports.getEmployeeList = async (req, res, next) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        next(err);
    }
};

module.exports.searchEmployee = async (req, res, next) => {
    try {
        const { name, phonenumber, email, gender, designation, courses } = req.query;
        let query = {};
        if (name) query.name = name;
        if (phonenumber) query.phonenumber = phonenumber;
        if (email) query.email = email;
        if (gender) query.gender = gender;
        if (designation) query.designation = designation;

        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteEmployee = async (req, res) => {
    try {
        const { _id } = req.query;
        await Employee.findByIdAndDelete(_id);
        res.status(200).send('Employee deleted successfully');
    } catch (error) {
        next(error);
    }
};
