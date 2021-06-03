
import Device from './device';
import UserLocation from './userLocation';
import CacheKey from './cacheKey';

export default class Request{
    constructor(
        host="www.example.com",
        method="GET",
        path="/helloworld",
        scheme="https",
        query="param1=value1&param2=value2",
        url="/helloworld?param1=value1&param2=value2",
        userLocation=new UserLocation(),
        device=new Device(),
        cpCode=1191398,
        cacheKey=new CacheKey(),
        ){
            this.host = host;
            this.method = method;
            this.path = path;
            this.scheme = scheme;
            this.query = query;
            this.url = url;
            this.userLocation = userLocation;
            this.device = device;
            this.cpCode = cpCode;
            this.cacheKey = cacheKey;
        }
    
        respondWith = jest.fn();
        
        getHeader = jest.fn();
        
        setHeader = jest.fn();
            
        addHeader = jest.fn();

        removeHeader = jest.fn();

        getHeaders = jest.fn();

        getVariable = jest.fn();

        setVariable = jest.fn();

        route = jest.fn();

}

