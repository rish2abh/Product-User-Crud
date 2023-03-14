const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName : ({
        type : String,
        required : true
    }),
    description : ({
        type : String,
        required : true
    }),
    price : ({
        type : Number,
        required : true
    }),
    userId : ({
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }),
    isActive : ({
        type : Boolean,
        default : true
    }),
})

productSchema.set("timestamps",true)
module.exports = mongoose.model("product",productSchema)