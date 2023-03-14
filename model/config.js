const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

mongoose.connect(process.env.URL ,{useNewUrlParser: true})
const connection = mongoose.connection
connection.once("open",function(){
    console.log("Database is connected sucessfully");
})