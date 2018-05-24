const express = require('express');
const http = require('http');
const mysql = require('mysql');
const cors = require('cors');

const database = require('./config/database');
const db = require('./models');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
require('./routes')(app);

/* Connect to MySQL on start
database.connect(db.MODE_PRODUCTION, (err) => {
  if (err) {
    console.log('Unable to connect to MySQL.')
    process.exit(1)
  } else {
    console.log("Database is connected...");
  }
}) */

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  db.sequelize.sync();
});

module.exports = { app };
