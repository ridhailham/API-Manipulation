const express = require('express')

const app = express()
const { sequelize } = require('./models')
const port = 3000

app.use(express.json())

const routes = require('./routes/index')

app.use(routes)


app.listen(3000, () => {
    console.log(`server is running on port ${port}`);
})