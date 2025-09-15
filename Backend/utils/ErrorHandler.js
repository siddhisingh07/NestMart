class ErrorHandler extends Error{
    constructor(
        statusCode,
        message =  'Something  went wrong',
        errors =[]
    ){
        console.log(errors)
        super(message)
        this.message = message
        this.statusCode=statusCode
        this.data=null
        this.errors = errors;
        this.success=false
    }
}
export {ErrorHandler}