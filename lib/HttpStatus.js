const ERRORS = {"100":"Continue","101":"Switching Protocols","102":"Processing","200":"OK","201":"Created","202":"Accepted","204":"No Content","205":"Reset Content","206":"Partial Content","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","415":"Unsupported Media Type","416":"Requested Range Not Satisfiable","417":"Expectation Failed","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","444":"Connection Closed Without Response","451":"Unavailable For Legal Reasons","499":"Client Closed Request","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","510":"Not Extended","511":"Network Authentication Required","Continue":"100","Switching Protocols":"101","Processing":"102","OK":"200","Created":"201","Accepted":"202","No Content":"204","Reset Content":"205","Partial Content":"206","Already Reported":"208","IM Used":"226","Multiple Choices":"300","Moved Permanently":"301","Found":"302","See Other":"303","Not Modified":"304","Use Proxy":"305","Temporary Redirect":"307","Permanent Redirect":"308","Bad Request":"400","Unauthorized":"401","Payment Required":"402","Forbidden":"403","Not Found":"404","Method Not Allowed":"405","Not Acceptable":"406","Proxy Authentication Required":"407","Request Timeout":"408","Conflict":"409","Gone":"410","Length Required":"411","Precondition Failed":"412","Payload Too Large":"413","Unsupported Media Type":"415","Requested Range Not Satisfiable":"416","Expectation Failed":"417","Misdirected Request":"421","Unprocessable Entity":"422","Locked":"423","Failed Dependency":"424","Upgrade Required":"426","Precondition Required":"428","Too Many Requests":"429","Request Header Fields Too Large":"431","Connection Closed Without Response":"444","Unavailable For Legal Reasons":"451","Client Closed Request":"499","Internal Server Error":"500","Not Implemented":"501","Bad Gateway":"502","Service Unavailable":"503","Gateway Timeout":"504","HTTP Version Not Supported":"505","Variant Also Negotiates":"506","Insufficient Storage":"507","Loop Detected":"508","Not Extended":"510","Network Authentication Required":"511"};
const TYPES = {"0xx": "Unknown", "1xx": "Informational", "2xx": "Success", "3xx": "Redirection", "4xx": "Client Error", "5xx": "Server Error"};

function getStatusType(status){
    let template = (Math.floor(status/100) || 0) + 'xx';
    return TYPES[template];
}

class HttpStatus extends Error{
    constructor(error){
        super();
        this.name = this.constructor.name;

        let message, status;

        switch(typeof error){
            case 'object':
                if(error === null){
                    break;
                }

                if('undefined' === typeof error.status){
                    message = error.message;
                    status = ERRORS[message];
                }else{
                    status = error.status;
                    message = ERRORS[status];
                }

                break;
            default:
                message = ERRORS[error];

                if('undefined' !== typeof message){
                    status = error;

                    if(/^\d{3}$/i.exec(message) !== null){
                        [status, message] = [message, status];
                    }
                }

                break;
        }

        this.status = Number(status) || 500;
        this.message = typeof message === 'string' ? message : ERRORS[this.status];

        this.type = String(getStatusType(this.status));
    }
    static getInstance(error){
        return new HttpStatus(error);
    }
}

module.exports = HttpStatus;