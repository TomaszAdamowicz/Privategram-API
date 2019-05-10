module.exports = () => {
    if(process.env.NODE_ENV === 'production'){
        return ''; // Production client URL
    } else {
        return ''; // Local client URL
    }
}