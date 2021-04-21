const ver = '2020.01.08';
/* Changelog: 
2020 8 Jan - added Cross-origin requests
*/
const http = require('http'); // 1 - Import Node.js core module
const fs = require('fs');
function getfile(req, res){
    if (typeof(res)=='undefined'){
        name = 'index.html';
    }
    else {
        name = req.url.substr(1);
    }
    if(name.substr(name.length-2)=='/' || name=='') name = name+'index.html';
    try {
        
    if(fs.existsSync(name)) {
        res.writeHead(200, {"Content-Type" : "text/html"});
        res.write(getfile('index.html'));
        res.end();
        return fs.readFileSync(name);
    } else {
        console.log('index.html does not exist.');
        return 'index.html does not exist.';
    }

} catch (err) {
    console.error(err);
}
}

const server = http.createServer(function (req, res) {   // 2 - creating server
    // getfile(req, res);
    if (typeof(res)=='undefined'){
        name = 'index.html';
    }
    else {
        name = req.url.substr(1);
    }
    if(name.substr(name.length-2)=='/' || name=='') name = name+'index.html';
    try {
    if(fs.existsSync(name)) {
        ext = name.substr(name.lastIndexOf('.')+1).toLowerCase();
        switch (ext) {
            case 'html':
            res.writeHead(200, {"Content-Type" : "text/html"});
            break;
            case 'css':
            res.writeHead(200, {"Content-Type" : "text/css"});
            break;
            case 'js':
            res.writeHead(200, {"Content-Type" : "application/javascript"});
            break;
            case 'mp4':
            res.writeHead(200, {"Content-Type" : "video/mp4"});
            break;
            case 'png':
            res.writeHead(200, {"Content-Type" : "image/png"});
            break;
            case 'webp':
            res.writeHead(200, {"Content-Type" : "image/webp"});
            break;
            case 'jpeg':
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            break;
            case 'jpg':
            res.writeHead(200, {"Content-Type" : "image/jpeg"});
            break;
            case 'gif':
            res.writeHead(200, {"Content-Type" : "image/gif"});
            break;
            case 'mp3':
            res.writeHead(200, {"Content-Type" : "audio/mp3"});
            break;
            case 'm4a':
            res.writeHead(200, {"Content-Type" : "audio/m4a"});//audio/m4a
            break;
            case 'ico':
            res.writeHead(200, {"Content-Type" : "image/x-icon"});
            break;
            case 'svg':
            res.writeHead(200, {"Content-Type" : "image/svg+xml"});
            break;
            default:
            res.writeHead(200, {"Content-Type" : "text/plain"});
            break;
        }
        res.writeHead(200, {"Access-Control-Allow-Origin" : "*"});
        res.write(fs.readFileSync(name));
        res.end();
        console.log([name,"exists"]);
    } else {
        console.err([name,'does not exist']);
    }

} catch (err) {
    console.error(err);
}

});
server.listen(8080); //3 - listen for any incoming requests
console.log('Node.js web server at port 8080 http://localhost:8080/ is running…')