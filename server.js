const express = require('express');
const app = express();

app.use(express.static('public'));

// Main page
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })

app.listen(process.env.PORT || 8080);