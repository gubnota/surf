#!/usr/local/bin/node
var path = require('path'), fs=require('fs');

function fromDir(startPath,filter,callback){

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    };
};

console.log(['\033[1;32m', 'Removing some stuff from .html', '\033[0m'].join(' '));
fromDir('./art-portraits.net',/\.html$/,function(filename){
    console.log('-- found: ',filename);
    fs.readFile(filename, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      // let result = data.replace(/<script type="text\/javascript">[^<]+<\/script>\s*<noscript><p><img src="http:\/\/piwik\.aw-hk\.com\/piwik\.php\?idsite=[0-9]+" style="border:0;" alt="" \/><\/p><\/noscript>/g, '')
      // .replace(/<script type="text\/javascript">[^<]+aliexpress[^<]+<\/script>/g, '')
      // .replace(/ href="http:\/\/[a-z\.\-]+\//g, ' href="\./')
      // .replace(/ src="http:\/\/[a-z\.\-]+\//g, ' src="\./')
      // .replace(/<script async src="\/\/pagead2.googlesyndication.com\/[^>]+><\/script>\s*<ins[^>]*><\/ins>/g, '')
      let result = data.replace(/http:\/\/art-portraits.net\//g, '/')
      .replace(/http:\\\/\\\/art-portraits.net\\\//g, '/')
      .replace(/<script>[^<]+i,s,o,g,r,a,m[^<]+<\/script>/g, '')
      .replace(/<script>[^<]+piwik.php[^<]+<\/script>/g, '')
      .replace(/<noscript>[^<]+piwik.php[^<]+<\/noscript>/g, '')

      fs.writeFile(filename, result, 'utf8', function (err) {
         if (err) return console.log(err);
      });
    });

});

// console.log(['Renaming ', '\033[1;32m', '?12345670', '\033[0m', ' files'].join(' '));
// fromDir('./',/\.[a-z]{2,4}\?[0-9]{10,}$/,function(filename){
//     console.log('-- found: ',filename);
// });


// fs.rename('/path/to/' + obj[p] + '.png', '/path/to/' + p + '.png', function(err) {
//     if ( err ) console.log('ERROR: ' + err);
// });