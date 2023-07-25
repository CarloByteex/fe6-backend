const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { establishDbConnection } = require('./mongo');
require('dotenv').config();
const router = require("./routes");

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors()); // Add this line to enable CORS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', router);

app.get('/download/:path', (req, res) => {
  const file = req.params.path
  const filePath = `uploads/${file}`; // Set the path to your file
  console.log(filePath);
  // Send the file as a download attachment
  res.download(filePath, (err) => {
    if (err) {
      // Handle error, such as file not found
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

establishDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});