const Q       = require('q');
const lib     = require('../lib');
const request = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        clientId,
        clientSecret,
        refreshToken
    } = req.body.args;
        
    let required = lib.parseReq({clientId, clientSecret, refreshToken});

    if(required.length > 0) 
        throw new Object({
            status_code: 'REQUIRED_FIELDS', 
            status_msg:  'Please, check and fill in required fields.',
            fields: required
        });
    
    request({
        uri: 'https://launchpad.37signals.com/authorization/token',
        qs: {
            type: 'refresh',
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken
        },
        method: 'POST'
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode))  
            defered.resolve(lib.safeParse(reslut));
        else 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));
    });

    return defered.promise;    
}