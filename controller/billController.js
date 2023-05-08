const billsSchema = require("../model/bills");

const bill = async (req, res) => {
  const add = new billsSchema(req.body);
  try {
    // const invoice = await billsSchema.populate("userId",{name : 1,email : 1}).populate("productId",{productName: 1,price : 1})
    const data = await add.save();
    res.send({
      message: "Bill Added ",
      data: data,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};

// const billList = async(req,res)=>{   //USE OF POPULATE
//   try {
//     const mylist = await billsSchema.find()
//     .populate("userId", {name : 1,email : 1,_id : 0})
//     .populate({
//       path: 'productId',
//       match: {
//         productName: "tv"
//       },
//       select:{productName: 1,price : 1,_id : 0} })
//     // .populate("productId",{productName: "tv"},{productName: 1,price : 1,_id : 0}).select({_id : 0,price:0})
//     res.json({
//       message : "Success",
//       data : mylist
//     })
//   }

//    catch (error) {
//     res.json({
//       message : error.message,
//     })
//   }
// }

const billList = async (req, res) => {          //USE OF AGGREATION AND LOOKUP ,  PIPLELINE 
  try {
    const mylist = await billsSchema.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "Product",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
                pipeline: [
                  {
                    $project: {
                      name: 1,
                      email: 1,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                // _id:0,
                productName: 1,
                price: 1,
                user: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 0,
          invoice: 1,
          price: 1,
          user: 1,
          Product: 1.0
          
          
          
          ,
        },
      },
    ]);
    res.json({
      message: "Success",
      data: mylist,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
module.exports = { bill, billList };
