//Dependencies
const http = require('http');
const url = require('url');

//Instantiate the HTTP server
let server = http.createServer((req, res) => {
    //Get the path from the URL
    let parsedUrl = url.parse(req.url, true);
    path = parsedUrl.path;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    //Select the handler form the router
    console.log(path);
    chosenHandler = typeof(router[trimmedPath]) == 'undefined' ? router.notFound : router[trimmedPath];
    
    //Route the request to the chosen handler with the data
    chosenHandler('Say it', (statusCode, payload) => {
        //Return the response
        res.setHeader('Content-Type', 'text/plain');

        let payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString);
    });
});

//Start the HTTP server
server.listen(8080);

handlers = {};

handlers.notFound = (data, callback) => {
    callback(404, {});
}

handlers.hello = (data, callback) => {
    payload = data == 'Say it' ? 
    {'message' : 'Smoke weed every day' } :
    {'message' : 'Mind your manners'};
    statusCode = 200;
    callback(statusCode, payload);
}

router = {
    'notFound' : handlers.notFound,
    'hello' : handlers.hello
}


