const express = require('express')

const cors = require('cors');
const app = express()
require('dotenv').config()

const port = process.env.PORT || 5000; 

// middware
app.use(cors())
app.use(express.json())





app.get('/', (req, res) => {
    res.send(' website is running.....')
  })
  
app.listen(port, () => {
    console.log(` listening on port ${port}`)
  })