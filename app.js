require('dotenv').config();
require('./config/mongoDB');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swagger = require('./utils/swagger');
const swagger_UI = require("swagger-ui-express");
const errorHandler = require('./middleware/errorHandler');
const checkDBConnection = require('./config/checkDB');
const userRouter = require('./routers/user');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
app.use(checkDBConnection);

app.use('/api/v1', userRouter);
app.use("/docs", swagger_UI.serve, swagger_UI.setup(swagger.openapiSpecification));

app.use((req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 404))
});

app.use(errorHandler);
module.exports = app;