function errorHandler(error, request, response, next){
    const errorStatus = error.statusCode || 500;
    response.status(errorStatus).jason({
        error: error.message || "Internal server error"
    })
}

export default errorHandler;