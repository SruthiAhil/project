const express = require("express");
const insertDatactrl = require("../controllers/user");
const router = express.Router();
router.post("/", insertDatactrl);
module.exports = router;
