'use strict';

var ccav = require('./ccavutil.js');
var qs = require('querystring');
exports.ccavres = function(req, res) {
  let ccavEncResponse = '';
  let ccavResponse = '';
  let workingKey = '2CCA67135044A7A9E86DEFE95EDE9D09';	// Put in the 32-Bit key shared by CCAvenues. TESTING 3010
  let accessCode = 'AVVK21KB61BH34KVHB';			// Put in the Access Code shared by CCAvenues. TESTING 3010
  let ccavPOST = '';

  req.on('data', function(data) {
	 ccavEncResponse += data;
	 ccavPOST =  qs.parse(ccavEncResponse);
	 var encryption = ccavPOST.encResp;
	 ccavResponse = ccav.decrypt(encryption, workingKey);
        // Response is decrypted
  });

  req.on('end', function() {
    // eslint-disable-next-line max-len
    const stringify = JSON.stringify(ccavResponse.split('&')).replace(/['"]+/g, '').replace(/[[\]]/g, '');
    console.log(stringify);
    let output = stringify.split(',').reduce(function(o, pair) {
      pair = pair.split('=');
      return o[pair[0]] = pair[1], o;
    }, {});
    // The 'output' variable is the CCAvenue Response in JSON Format
    if (output.order_status === 'Failure') {
        // DO YOUR STUFF redirect to failure url and update failure status to database
      res.writeHead(301,
            {Location: 'http://localhost:8100/failed'}
            );
      res.end();
    } else if (output.order_status === 'Success') {
            // DO YOUR STUFF redirect to success url and update success status to database
      res.writeHead(301,
               {Location: 'http://localhost:8100/success'}
            );
      res.end();
    }
  });
};
