const express = require("express")
const router = express()
const controller = require("../controller/userController")
const Val = require("../validation/userValidation")
const crud = require("../controller/crudUser")
const auth = require("../middleware/auth")

router.post("/signup",Val.userVal,controller.signUp)
router.post("/login",Val.userloginVal,controller.login)
router.delete("/delete/:id",auth,crud.Delete)
router.patch("/update/:id",auth,crud.Update)
router.get("/list",crud.list)
router.get("/pagelist",crud.paginationList)




module.exports = router