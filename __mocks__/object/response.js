
export default class Response{
    constructor(status="200"){
            this.status = status;
        }
    
        getHeader = jest.fn();
        
        setHeader = jest.fn();
                    
        addHeader = jest.fn();

        removeHeader = jest.fn();

}

