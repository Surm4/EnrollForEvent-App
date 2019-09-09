const express = require('express');
const port = process.env.port || 7000;
const app = express();
const routes = require('./routes/index.js');

app.listen(port, () => console.log(`Server started on port ${port}!`));
app.use("/", routes);
