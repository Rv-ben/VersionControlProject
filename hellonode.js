const express = require('express')
const app = express()
const port = 5559
const path = require('path')

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/ex3.html')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))