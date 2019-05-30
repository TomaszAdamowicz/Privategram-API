if(process.env.NODE_ENV !== 'production') require ('dotenv').config();

module.exports = {
    cors: process.env.APP_URL,
    host: process.env.HOST_URL,
    jwt: process.env.JWT_SALT,
    mongoDB: process.env.MONGO_DB
}