class responseHandler {
    constructor(public statusCode : number , public message : string, public data : any) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export { responseHandler }