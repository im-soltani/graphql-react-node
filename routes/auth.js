const router = require("express").Router();
const User = require("../models/User");
const { createJwtToken } = require("../util/auth")
const isAuth = require("../middleware/isAuth")

//Login
router.post("/login", async (req, res) => {
   
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });

     

      if (!user) {
        return res.status(400).send({ msg: "Bad Credentials email" });
      }
  
      
  
      //sign the user
  
      const payload = {
        _id: user._id,
      };
  console.log(user)
    
      const token = createJwtToken(user)
  console.log(token)
     return res.send({ msg: "Login Success", user, token });
    } catch (error) {
      res.status(500).send({ msg: "Server error" });
    }
  });


  router.get("/me", isAuth, (req, res) => {
    res.status(200).send({ user: req.user });
  });



  module.exports = router;


  