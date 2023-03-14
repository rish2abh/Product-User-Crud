const user = require("../model/userSchema");

const list = async (req, res) => {
  try {
    const alldata = await user.find().select({
      name: 1,
      email: 1,
      number: 1,
      createdAt : 1,
    });
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

module.exports = { Delete, Update, list };
