const mongoose = require("mongoose");

module.exports.DBConnect = async(DB_URL) => {
    try{
        const dpOptions = {
            dbName:'EmployeeMS',        
        }
        await mongoose.connect(DB_URL,dpOptions);
        console.log("the data was connected successfully");
    } catch(err){
        console.error(err);
    }
}