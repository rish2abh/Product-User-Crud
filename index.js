require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const Userrouter = require("./router/userRoutes")
const productRouter = require("./router/productRouter")
require("./model/config")
// var CronJob = require('cron').CronJob;



// new CronJob('* * * * * *', function() {
//     console.log('You will see this message every second');
//   },null,true);




app.use(bodyParser.json())
app.use("/user",Userrouter)
app.use("/product",productRouter)


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port no : ${process.env.PORT}`);
})
