#!/usr/local/bin/node
let express = require('express')
let app = express()

let os = require('os');
let default_address = 'localhost';
let ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
  let alias = 0;
  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log([ifname, '\033[1;32m', iface.address, '\033[0m'].join(' '));
    } else {
      // this interface has only one ipv4 adress
      console.log([ifname, '\033[1;32m', iface.address, '\033[0m'].join(' '));
    }
    default_address = iface.address;
    ++alias;
  });
});
let qrcode = require('qrcode-terminal')
qrcode.generate(['http://',default_address,':3006'].join(''), {small: true})
let opn = require('opn')
opn(['http://','127.0.0.1',':3006'].join(''))


app.use((req, res, next)=>{
  console.log(["\033[1;31m",req.method, "\033[0m", req.connection.remoteAddress
, req.url].join(' '));
  next();
})
app.use(express.static('nova-rec.com'))
app.listen(3006, ()=> {
console.log('Listening')
})