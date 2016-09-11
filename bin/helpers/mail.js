'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendHTML = sendHTML;

var _mailgun = require('mailgun');

function sendHTML(recipient, subject, html) {
  var mg = new _mailgun.Mailgun(process.env.MAILGUN_KEY);
  var sendHtml = '<!doctype html> <html lang="en"> <head> <meta charset="UTF-8"> </head> <body> <center> <table width="70%" style="font-family: helvetica verdana sans-serif; font-size: 12pt; color: #666;"> <tr><td><img src="' + process.env.BASE_URL + '/assets/img/2016NavbarLogo.png" alt="OpenCircuit Logo" /></td></tr> <tr> <td> ' + html + ' </td> </tr> </table></center></body></html>';

  mg.sendRaw('noreply@opencircuit.us', recipient, 'From: "OpenCircuit.us Support" <noreply@opencircuit.us>' + '\nTo: ' + recipient + '\nContent-Type: text/html; charset=utf-8' + '\nSubject:' + subject + '\n\n' + sendHtml, function (err) {
    err && console.log(err);
  });
}