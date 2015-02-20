module.exports = function (request, response){
  function errorResponse(request, response, message) {
    console.log(message, request.url);
    response.writeHead(404, {'Content-type': 'text/html'});
    response.write(message);
    response.end(request.url);
  }

  if(request.url.substr(1,8) == "private/") {
    errorResponse(request, response, "Not authorized:");
    return;
  }

  var fs = require('fs');
  var ext = request.url.substr(request.url.lastIndexOf('.') + 1);
        if (ext == "html" || ext == "css") {
            fs.readFile(request.url.substr(1), 'utf8', function (errors, contents){ 
                if (contents == null) {
                  errorResponse(request, response, "Could not find file:");
                  return;
                }
                response.writeHead(200, {'Content-type': 'text/' + ext});
                response.write(contents);
                response.end();
            });
        }
        else if (ext == "jpg" || ext == "jpeg" || ext == "png" || ext == "gif") {
            fs.readFile(request.url.substr(1), function (errors, contents){ 
                if (contents == null) {
                  errorResponse(request, response, "Could not find file:");
                  return;
                }
                response.writeHead(200, {'Content-type': 'image/' + ext});
                response.write(contents);
                response.end();
            });
        }
        else if (ext == "js") {
            fs.readFile(request.url.substr(1), 'utf8', function (errors, contents){ 
                if (contents == null) {
                  errorResponse(request, response, "Could not find file:");
                  return;
                }
                response.writeHead(200, {'Content-type': 'text/javascript'});
                response.write(contents);
                response.end();
            });
        }
        else {
          errorResponse(request, response, "File extension not recognized:")
        }  
};