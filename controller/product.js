const product_schema = require("../model/productSchema");
const user_Schema = require("../model/userSchema")

const Product = async (req, res) => {
  const add = new product_schema(req.body);
  try {
    const data = await add.save();
    res.send({
      message: "Add product ",
      data: data,
    });
  } catch (err) {
    res.send({
      message: err.message,
    });
  }
};


const productList = async (req, res) => {
  try {
    const list = await user_Schema.aggregate([
      {
        $sort: { createdAt: 1 },
      },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "userId",
            as: "Products",
          },
        },
        {
          $unwind: {
            path: "$users1",
            preserveNullAndEmptyArrays: true,
          },
        },
    ]);
    res.json({
      message: "All the product ",
      data: list,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};


const myproduct = async (req, res) => {
  const id = req.params.id;
  try {
    var mysort = { createdAt: -1 };

    const mylist = await product_schema
      .find({ userId: id })
      .populate("userId", { name: 1, email: 1 })
      .select({
        productName: 1,
        description: 1,
        price: 1,
        userId: 1,
        createdAt: 1,
      })
      .sort(mysort);

    console.log(mylist);

    res.json({
      status: 200,
      message: `All the product buy by ${mylist.name}`,
      myproduct: mylist,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// const userList = async(req,res)=>{
// try {
//     let mysort = {createdAt :-1}
//     const userList = await user_Schema.find()
//     console.log(userList);
//     res.json({
//         message : "all the user",
//          userList
//     })

// } catch (error) {
//     res.json({
//         message : error.message
//     })
// }
// }

module.exports = { Product, productList, myproduct };
