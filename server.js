const express = require('express');
const http = require('http');
const mysql = require('mysql')

const database = require('./config/database');
const { db } = require('./config/db');

const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app);

app.get('/', (req, res) => (
  res.send('Hello World!')
))

// Connect to MySQL on start
// database.connect(db.MODE_PRODUCTION, (err) => {
//   if (err) {
//     console.log('Unable to connect to MySQL.')
//     process.exit(1)
//   } else {
//     console.log("Database is connected...");  
//   }
// })

db.authenticate()
.then(() => console.log("Sequelize db connected"))
.catch((err) => console.log("Unable to connect to the database: ", err));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});


