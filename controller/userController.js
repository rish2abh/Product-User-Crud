const user = require("../model/userSchema");
// const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
const Transport = require("../service/mailsend")

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const userData = new user(req.body);

  try {
    const userExits = await user.findOne({ email: req.body.email });
    if (userExits) {
      res.status(400).json({
        status: "failed",
        message: "Email Already Exist",
      });
    } else {
      userData.password = crypto
        .createHmac("sha256", password)
        .digest("hex");
      let info =  Transport.sendMail({
        from : 'dee.rohan@ethereal.email',
        to :  'praveen.mishra@moreyeahs.in',
        subject : "finally mail aa gya ",
        html : "<h1>hey my boi</h1>"
      });
      const data = await userData.save();
      res.status(201).json({
        status: "Sucessful",
        message: "Data save Sucessfully",
        email : "check your mail",
        data : data
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password) {
      const valUser = await user.findOne({ email: email });
      if (valUser != null) {
        let data = crypto
          .createHmac("sha256", password)
          .digest("hex");
        // console.log(data, valUser.password);
        if (data === valUser.password) {
          const token = jwt.sign(
            { userId : valUser._id },
             process.env.SCERET_KEY, 
          { expiresIn: '1h' });
          res.status(200).json({
            status: 200,
            message: "Login Successfully",
            data: data,
            token : token
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: " Password is not Valid",
        });
      }
    }
  } catch (err) {
    res.send({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = { signUp, login };
