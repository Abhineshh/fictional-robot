const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      
      if (!admin) {
        return res.json({ msg: "Incorrect Username or Password", status: false });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
  
      if (!isPasswordValid) {
        return res.json({ msg: "Incorrect Username or Password", status: false });
      }
  
      delete admin.password;
      return res.json({ status: true, adminname:admin.adminname });
    } catch (err) {
      next(err);
    }
  }

module.exports.register = async(req,res,next) => {
    try{
        const {adminname, email,password} = req.body;
        
        const emailCheck = await Admin.findOne({email});
        if(emailCheck){
            return res.json({msg: "Email already user",status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            email,
            adminname,
            password: hashedPassword,
        });

        delete admin.password;
        return res.json({status: true, admin});
    } catch(err){
        next(err);
    }
}

module.exports.logOut = (req, res, next) => {
    try{
        if(!req.params.id) return res.json({msg: "User id is required"});
        return res.status(200).send();
    } catch(err){
        next(err);
    }
}