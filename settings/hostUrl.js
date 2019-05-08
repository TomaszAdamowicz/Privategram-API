module.exports = () => {
    if(process.env.NODE_ENV === 'production'){
        return ''; // Production host url
    } else {
        return 'http://localhost:3006'; // Localhost url
    }
}