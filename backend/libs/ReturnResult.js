var Config = require('config'),
    config = Config.get('App');

class ReturnResult {

    constructor(value, values, message, errorMessage) {

        // set local properties
        this.value = value != null ? value : {};
        this.values = (values != null && values) ? values : [];
        this.total = values != null ? values.length : this.value != null ? 1 : 0;
        this.success = errorMessage == null;

        // set up error message
        this.errorMessage = 
            errorMessage != null ? 
                (config.api.show_error_messages == true ? errorMessage: config.api.default_error_message)
            : "";

        // set message 
        this.message = message;

        // date created
        this.created_date = new Date();

        // set token
        

    }
}

module.exports = ReturnResult;