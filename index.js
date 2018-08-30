//Dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');

//Instantiate the HTTP server
let server = http.createServer((req, res) => {
    //Get the path from the URL
    let parsedUrl = url.parse(req.url, true);
    path = parsedUrl.path;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    let method = req.method.toLowerCase();
    console.log(method)
;    let decoder = new StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });

    req.on('end', () => {
        console.log('On End');
        let payload = buffer + decoder.end();

        //Select the handler form the router
        chosenHandler = typeof(router[trimmedPath]) == 'undefined' ? router.notFound : router[trimmedPath];
        
        var data = {
            payload,
            method
        }

        //Route the request to the chosen handler with the data
        chosenHandler(data, (statusCode, payload) => {
            //Return the response
            res.setHeader('Content-Type', 'text/plain');

            let payloadString = JSON.stringify(payload);
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });


});

//Start the HTTP server
server.listen(8080);
console.log('Server listening on port 8080');

handlers = {};

handlers.notFound = (data, callback) => {
    callback(404, {});
}

handlers.hello = (data, callback) => {
    console.log(data.payload);
    payloadObject = JSON.parse(data.payload);
    
    payload = payloadObject.request == 'Say it' && data.method == 'post' ? 
    {'message' : 'Smoke weed every day' } :
    {'message' : 'Mind your manners'};
    statusCode = 200;
    callback(statusCode, payload);
}

router = {
    'notFound' : handlers.notFound,
    'hello' : handlers.hello
}


