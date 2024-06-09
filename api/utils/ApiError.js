class ApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.status = statusCode >= 400 && statusCode <500 ? 'Fail':'Error'

        Error.captureStackTrace(this,this.constructor)
    }
}

export { ApiError }