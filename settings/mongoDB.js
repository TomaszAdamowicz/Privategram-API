module.exports = () => {
    if(process.env.NODE_ENV === 'production'){
        return ""; // Production mongoDB credentials
    } else {
        return "" // Local mongoDB credentials
    }
}