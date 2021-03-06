const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const apiRouter = require('./api/index');
const error = require('./utils/error');
const app = express();
const config = require('./config/config');

const port = process.env.port || 3006;

app.use(cors({origin: config.cors}));

app.use(helmet());

app.use(compression());

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(config.mongoDB, { useNewUrlParser: true })

app.use(express.static('public'))

app.use('/api',apiRouter);

app.use(error);

app.listen(port, () => {
    console.log('App running on port 3006');
})