const Client = require('../schemas/client');
const Sale = require('../schemas/sale');

// get all clients
const getClientList = async (req, res) => {
  try {
    const clients = await Client.find()
    res.status(200).json(clients)
  } catch (error) {
    res.status(401).json(error)
  }
}

const searchSale = async (req, res) => {
  let query = {};
  const {searchClient, searchCompany} = req.body;
  
  if(searchClient){
    query.clientId = searchClient;
  }
  if(searchCompany){
    query.companyName = searchCompany;
  }
  console.log(query);
  try {
    const clients = await Sale.find(query)
    res.status(200).json(clients)
  } catch (error) {
    res.status(401).json(error)
  }
}

// get a client

const getClient = async (req, res) => {
  const { id } = req.params
  try {
    const client = await Client.findOne({ _id: id })
    if (client) {
      res.status(200).json(client)
    } else {
      res.status(404).json("Client does not exist!")
    }

  } catch (error) {
    res.status(401).json(error)
  }
}

// edit a Client

const setStatus = async (req, res) => {
  const { id, status } = req.body

  try {
    const editClient = await Client.findByIdAndUpdate({ _id: id }, {
      status
    }, {
      new: true
    })
    res.status(200).json(editClient);
  } catch (error) {
    res.status(401).json(error)
  }
}

// get all Sales
const getSaleList = async (req, res) => {
  try {
    const sales = await Sale.find()
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
  const { id, customerName, companyName, email, contactNumber, GSTNumber, requireService, qty, orderValue, orderStatus, incenValue, incenStatus, remarks } = req.body
  console.log(id)
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
        orderStatus,
        incenValue,
        incenStatus,
        remarks
      },
      {
        new: true
      })
    res.status(200).json(editSale);
  } catch (error) {
    res.status(401).json(error)
  }
}

module.exports = {getClientList, searchSale, getClient, setStatus, getSaleList, getSale, editSale}