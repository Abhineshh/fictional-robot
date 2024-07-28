const multer = require('multer');
const Employee = require('./models/Employee'); // Adjust the path to your model

const storage = multer.memoryStorage(); // or configure storage to save files on disk
const upload = multer({ storage });

module.exports.editEmployee = [
  upload.single('imagefile'),
  async (req, res, next) => {
    try {
      const { _id, name, phonenumber, email, gender, designation, courses } = req.body;

      const updateData = {
        name,
        phonenumber,
        email,
        gender,
        designation,
        courses: Array.isArray(courses) ? courses : [courses], // Ensure courses is an array
      };

      if (req.file) {
        updateData.imageFile = req.file.buffer.toString('base64'); // or handle file saving
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(_id, updateData, { new: true });

      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.status(200).json(updatedEmployee);
    } catch (err) {
      next(err);
    }
  }
];
