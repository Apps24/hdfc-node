'use strict';
var ccav = require('./ccavutil.js');
module.exports = function(Order) {

    Order.encryptFormData = function (request, cb) {
        var formBody = '';
        var workingKey = '2CCA67135044A7A9E86DEFE95EDE9D09';	//Put in the 32-Bit key shared by CCAvenues.TESTING 3010
        var accessCode = 'AVVK21KB61BH34KVHB';	//Put in the Access Code shared by CCAvenues. TESTING 3010
        var encRequest = '';
        encRequest = ccav.encrypt(request, workingKey);
        cb(null, encRequest);
      }
    
      Order.remoteMethod('encryptFormData', {
        accepts: {
          arg: 'request',
          type: 'any'
        },
        returns: {
          arg: 'response',
          type: 'any'
        },
        http: {
          path: '/encryptFormData',
          verb: 'get'
        }
      });

};
