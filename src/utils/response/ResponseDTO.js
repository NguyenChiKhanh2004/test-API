class ResponseDTO {
    constructor(message = "", code = 0, data = null) {
        this.message = message;
        this.code = code;
        this.data = data;
    }

    static success(data, message = "Success", code = 200) {
        return new ResponseDTO(message, code, data);
    }

    static error(message = "Error", code = 500) {
        return new ResponseDTO(message, code, null);
    }
}

module.exports = ResponseDTO;