const mongoose = require("mongoose")

const billsSchema = new mongoose.Schema({
    invoice : ({
        type : Number,
        required : true
    }),
    Qty : ({
        type : Number,
        required : true
    }),
    price : ({
        type : Number,
        required : true
    }),
    total : ({
        type : Number,
        required : true
    }),
    userId : ({
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
    }),
    productId : ({
        type : mongoose.Schema.Types.ObjectId,
        ref : "product",
    }),
    isActive : ({
        type : Boolean,
        default : true
    }),
})

billsSchema.set("timestamps",true)
module.exports = mongoose.model("Bill",billsSchema)