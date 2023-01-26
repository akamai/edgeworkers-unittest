export function onOriginRequest(request) {
    let query = request.query
    let index = query.indexOf('respondWithonOriginRequestTest=')
    if (index !==-1) {
        try {
            request.respondWith(200, {'respond_with_stage': 'onOriginRequest'}, "response constructed by ew\r\n");
        } catch {
            throw new Error("Err calling respondWith onOriginRequest stage!");
        }
    }
}

export function onOriginResponse(request, response) {
    let query = request.query
    let index = query.indexOf('respondWithonOriginResponseTest=')
    if (index !==-1) {
        try {
            request.respondWith(200, {'respond_with_stage': 'onOriginResponse'}, "response constructed by ew\r\n");
        } catch {
            throw new Error("Err calling respondWith onOriginResponse stage!");
        }
    }
}