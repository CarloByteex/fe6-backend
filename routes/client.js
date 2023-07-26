const express = require("express");
const upload = require("../multerConfig/storageMulter");
const { login, register, isAuthenticated } = require("../controllers/auth/ClientController");
const { getSaleList, editSale, getSale, createSale } = require("../controllers/ClientController");

const router = express.Router();

router.post("/login", login);

router.post("/register", upload.array('files'), register);

router.get("/authenticate", isAuthenticated);

router.get("/:id/sale/all", getSaleList);

router.get("/sale/:id", getSale);

router.post("/sale/create", createSale);

router.post("/sale/edit", editSale);


module.exports = router;