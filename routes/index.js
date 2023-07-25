const express = require("express");
const clientRouter = require("./client");
const adminRouter = require("./admin");

const router = express.Router();

router.use("/client", clientRouter);
router.use("/admin", adminRouter);

module.exports = router;