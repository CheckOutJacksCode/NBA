const logError = err => {
    console.log("ERROR: " + String(err))
}

const errorLoggerMiddleware = (err, req, res, next) => {
    logError(err)
    next(err)
}

const returnErrorMiddleware = (err, req, res, next) => {
    console.log(res);
    res.status(err.statusCode || 500)
       .send(err.message)
}

module.exports = {
    logError,
    errorLoggerMiddleware,
    returnErrorMiddleware
}