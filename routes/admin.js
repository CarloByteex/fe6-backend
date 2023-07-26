const express = require("express");
const { getClientList, getClient, setStatus, searchSale, getSaleList, getSale, editSale } = require("../controllers/AdminController");

const router = express.Router();

router.get("/client/all", getClientList);

router.get("/client/:id", getClient);

router.post("/client/status", setStatus);

router.get("/sale/all", getSaleList);

router.get('/sale/:id', getSale);

router.post('/sale/edit', editSale);

router.post('/sale/search', searchSale);

module.exports = router;
