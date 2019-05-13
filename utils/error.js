const error = (err, req, res, next) => {
    console.error(err.message);

    let message = err.message || 'Something broke!';
    let status = err.status || 500;

    res.status(status).send(message);
}

module.exports = error