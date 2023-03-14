const express = require("express")
const router = express()
const pController = require("../controller/product")

router.post("/add",pController.Product)
router.get("/list",pController.productList)
router.get("/mylist/:id",pController.myproduct)



module.exports = router



// router.get("/userlist",pController.userList)