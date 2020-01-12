const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const errHandler = require('./handler/error');
const serverPort = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth'));

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errHandler);

app.listen(serverPort, () => console.log(`Server running on port: ${serverPort}`));
