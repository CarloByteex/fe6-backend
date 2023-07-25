const express = require("express");
const { login, isAdminAuthenticated } = require("../controllers/auth/AdminController");
const { getClientList, getClient, setStatus, searchSale, getSaleList, getSale, editSale } = require("../controllers/AdminController");

const router = express.Router();

router.post("/login", login);

router.get("/authenticate", isAdminAuthenticated);

router.get("/client/all", getClientList);

router.get("/client/:id", getClient);

router.post("/client/status", setStatus);

router.get("/sale/all", getSaleList);

router.get('/sale/:id', getSale);

router.post('/sale/edit', editSale);

router.post('/sale/search', searchSale);

module.exports = router;
