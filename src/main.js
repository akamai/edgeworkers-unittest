"use strict";
import URLSearchParams from "url-search-params";
import { Cookies, SetCookie } from "cookies";
import { createResponse } from 'create-response';
// import * as vscode from "./vscode";


/**
 * This event happens for every request as the request is received,
 * before checking if a response is available in cache.
 * Use this event for request modifications before going to cache or to origin
 *
 * @param {request} request - The request that has been made to the edge.
 */
export function onClientRequest(request) {

}

/**
 * This happens just before sending the request to the origin.
 * This event only happens if the response is not served from cache and not constructed on the edge.
 * Use this event if you want to affect the response coming back from the origin.
 *
 * @param {request} request - The request object representing the outgoing request to origin.  Modifications made to this object will be seen at the origin, but not other request handlers.
 */
export function onOriginRequest(request) {
    
}

/**
* This event happens as the origin response is created.
* The event only happens if the response is not served from cache and not constructed on the edge.
* Use this event if you want to modify the response before it is cached.
* 
 @param {request} request - The request object representing the current request after modifications from onClientRequest.
 @param {response} response - The response object representing the current response.  Modifications to this response object will be seen in the onClientResponse handler.
*/
export function onOriginResponse(request, response) {

}

/**
 * This event happens for every request just before the client response is sent.
 * Use this event to modify responses before they are sent to the client.
 *
 * @param {request} request - The request object representing the current request after modifications from onClientRequest.
 * @param {response} response - The response object representing the current response that will be returned from the edge.
 */
export function onClientResponse(request, response) {
    
}

export async function responseProvider(request) {
    // junk that calls node to prove this won't work
    const os = require('os');
    console.log(JSON.stringify(os.cpus()));

    const htmlBody = `
<!DOCTYPE html>
<html lang="en" xml:lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Testing Edge</h1>
    <p>This page served 100% from edge</p>
    <p>This paragraph serves to fill space and do little else</p>
</body>
</html>
    `;

    const response = {
        status: 200,
        headers: { 
            'Content-Type': ['text/html'] 
        },
        body: htmlBody
    };
    

    // Send Response
    return createResponse(response.status, response.headers, response.body);
    //request.respondWith(response.status, response.headers, response.body);
}
