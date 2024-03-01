const express = require('express')
const app = express()
const env = require('process').env;
const port = env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})