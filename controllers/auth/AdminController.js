const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../schemas/admin');

const login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ name }).exec();

    if (!adminUser) return res.status(401).json({ response: 'User not found' });

    const { _id: id, password: passwordHash } = adminUser;
    const verifyAdminPassword = await bcrypt.compare(password, passwordHash);

    if (verifyAdminPassword) {
      jwt.sign({ id, name, password }, process.env.JWT_SECRET, { expiresIn: '24h' }, (error, token) => {
        if (error) {
          res.status(500).json(error);
        }
        res.status(200).json({ token, adminUser });
      });
    } else {
      res.status(401).json({ response: 'Unauthorized' });
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

const isAdminAuthenticated = async (req, res) => {
  
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("Admin is not authenticated");
    
    const token = authorization.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user)
    const { id, name } = (user);
    const verifyUser = await Admin.findOne({name});

    if (verifyUser && verifyUser.name === name) {
      res.status(200).json(verifyUser);
    }
    else {
      res.status(401).json({});
    };
  } catch (err) {
    return err;
  }
}

module.exports = {login, isAdminAuthenticated};