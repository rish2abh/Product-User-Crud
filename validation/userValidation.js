const userValSch = require("./userValSchema");

module.exports = {
  userVal: async (req, res, next) => {
    const value = await userValSch.userSchemaVal.validate(req.body, {abortEarly: true});
    if (value.error) {
      res.status(400).json({
        status: "Failed",
        message: value.error.details[0].message
      });
    } else {
      next();
    }
  },
  userloginVal: async (req, res, next) => {
    const value = await userValSch.userLoginSch.validate(req.body, {abortEarly: true});
    if (value.error) {
      res.status(400).json({
        status: "Failed",
        message: value.error.details[0].message
      });
    } else {
      next();
    }
  },
};
