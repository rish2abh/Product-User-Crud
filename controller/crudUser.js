const user = require("../model/userSchema");

const paginationList = async (req, res) => {
  console.log(req.query);
  const { page = 1, limit = 10 } = req.query;

  try {
    const userList = await user.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
      console.log(userList);

    const count = await user.countDocuments();

    res.json({
      userList,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
};



const list = async (req, res) => {
  console.log(req.body);
  try {
    const alldata = await user.find()
    .select({
      name: 1,
      email: 1,
      number: 1,
      createdAt : 1,
    });
    console.log(alldata);
    res.json({
      message: "All Users",
      data: alldata,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const Update = async (req, res) => {
  const id = req.params.id;
  try {
    const edit = await user.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      message: "Updated SucessFully",
      data: edit,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

const Delete = async (req, res) => {
  const id = req.params.id;
  try {
    const remove = await user.findByIdAndDelete(id);
    res.json({
      message: "data deleted",
    });
  } catch (err) {
    res.json({
      message: "failed",
      status : 404
    });
  }
};

module.exports = { Delete, Update, list,paginationList };
