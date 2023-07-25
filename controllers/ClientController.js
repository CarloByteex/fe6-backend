const Sale = require('../schemas/sale');
const mongoose = require("mongoose");

// get client's Sales
const getSaleList = async (req, res) => {
  const clientId = req.params.id;
  try {
    console.log(clientId);
    const sales = await Sale.find({clientId: clientId})
    res.status(200).json(sales)
  } catch (error) {
    res.status(401).json(error)
  }
}

// get a Sale

const getSale = async (req, res) => {
  const { id } = req.params
  try {
    const sale = await Sale.findOne({ _id: id })
    if (sale) {
      res.status(200).json(sale)
    } else {
      res.status(404).json("Sale does not exist!")
    }

  } catch (error) {
    res.status(401).json(error)
  }
}

// edit a Sale

const editSale = async (req, res) => {
  const { id, customerName, companyName, email, contactNumber, GSTNumber, requireService, qty, orderValue } = req.body

  try {
    const editSale = await Sale.findByIdAndUpdate({ _id: id },
      {
        customerName,
        companyName,
        email,
        contactNumber,
        GSTNumber,
        requireService,
        qty,
        orderValue,
      },
      {
        new: true
      })
    res.status(200).json(editSale);
  } catch (error) {
    res.status(401).json(error)
  }
}

const createSale = async (req, res) => {
  const { customerName, companyName, email, contactNumber, GSTNumber, requireService, qty, orderValue, clientId } = req.body

  try {
    const newSale = new Sale({
      clientId,
      customerName,
      companyName,
      email,
      contactNumber,
      GSTNumber,
      requireService,
      qty,
      orderValue
    })
    await newSale.save();
    res.status(200).json(newSale);
  } catch (error) {
    res.status(401).json(error)
  }
}

module.exports = {getSaleList, getSale, editSale, createSale};