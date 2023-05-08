const express = require("express")
const router = express()
const controller = require("../controller/billController")

router.post("/invoice",controller.bill)
router.get("/list",controller.billList)



module.exports = router