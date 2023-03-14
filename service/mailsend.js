const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "ethereal",
  auth: {
    user : 	"dee.rohan@ethereal.email", 
   pass :	"RVhjdEVGXUXxzBMHHv"
  },
});

module.exports = transporter
// let specification = {
//   from: "jaitesting10@outlook.com",
//   to: "JaivardhanSingh.Sikarwar@moreyeahs.in",
//   subject: "Test mail",
//   text: "Node.js testing mail for GeeksforGeeks",
// };

// try {
//   transporter.sendMail(specification, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("sent:" + result.response);
//   });
// } catch (e) {
//   console.log("ERRR = ", e);
//   throw e;
// }
