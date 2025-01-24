class ApiErrors extends Error {
    constructor(
        statusCode = 500,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        // Call the parent class constructor
        super(message);

        // Validate the status code
        if (statusCode < 100 || statusCode > 599) {
            throw new Error("Invalid HTTP status code");
        }

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        // Assign stack trace
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
  
  export default  ApiErrors;
  