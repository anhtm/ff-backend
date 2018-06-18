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

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
  db.sequelize.sync();
});

module.exports = { app };
