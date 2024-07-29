const router = require('express').Router();
const multer = require('multer');
const path = require('path');

const { createEmployee, editEmployee, getEmployeeList, searchEmployee, deleteEmployee } = require("../controllers/empController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "employeePictures");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: Only images are allowed!');
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

router.post("/createEmployee", upload.single('imagefile'), createEmployee);
router.put("/editEmployee", upload.single('imagefile'), editEmployee);
router.get("/getEmployeeList", getEmployeeList);
router.get("/searchEmployee", searchEmployee);
router.delete("/deleteEmployee", deleteEmployee);

module.exports = router;
