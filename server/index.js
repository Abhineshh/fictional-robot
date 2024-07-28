const express = require("express");
const cors = require("cors");
const {DBConnect} = require("./DBConnect")
require("dotenv").config();
const path = require("path")


const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;



const authRoutes = require("./routes/auth");
const empRoutes = require("./routes/emp");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/employeePictures', express.static(path.join(__dirname, 'employeePictures')));


DBConnect(DB_URL);

app.use("/api/auth",authRoutes);
app.use("/api/emp",empRoutes)



app.listen(PORT,()=>{
    console.log(`the server has started at port ${PORT}`)
});