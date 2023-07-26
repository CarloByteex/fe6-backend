const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require("../../multerConfig/storageMulter");
const Client = require('../../schemas/client');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email)

  try {
    const client = await Client.findOne({ email }).exec();

    if (!client) return res.status(401).json({ response: 'User not found!' });

    const { _id: id, password: passwordHash } = client;
    const verifyPassword = await bcrypt.compare(password, passwordHash);

    if (verifyPassword) {
      jwt.sign({ id, email, password }, process.env.JWT_SECRET, { expiresIn: '5m' }, (error, token) => {
        if (error) {
          res.status(500).json(error);
        }
        res.status(200).json({ token, client });
      });
    } else {
      res.status(401).json({ response: 'Incorrect password!' });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const register = async (req, res) => {
  const { name, email, phone, place, password, isAdmin } = req.body;
  const file = req.files

  try {
    const client = await Client.findOne({ email })
    if (client) {
      res.status(403).json("The user already exist in our database....")
    }
    else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newClient = new Client({
        name,
        email,
        isAdmin,
        phone,
        place,
        password: hashedPassword,
        cv: file[0].filename,
        certification: file[1].filename
      })

      await newClient.save();
      jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '5m' }, (error, token) => {
        if (error) {
          res.status(500).json(error);
        }
        res.status(200).json({ token, newClient });
      });
    }
  }
  catch (error) {
    res.status(401).json(error)
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Client is not authenticated");

    const token = authorization.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const { email } = user;
    const verifyUser = await Client.findOne({ email });
    if (verifyUser && verifyUser.email === email) {
      res.status(200).json(verifyUser);
    }
    else return {};
  } catch (err) {
    return err;
  }
}


module.exports = {login, register, isAuthenticated};