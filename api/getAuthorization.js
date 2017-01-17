const Q       = require('q');
const lib     = require('../lib');
const request = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        accessToken
    } = req.body.args;
        
    let required = lib.parseReq({accessToken});

    if(required.length > 0) 
        throw new Object({
            status_code: 'REQUIRED_FIELDS', 
            status_msg: 'Please, check and fill in required fields.',
            fields: required
        });
    
    request({
        uri: 'https://launchpad.37signals.com/authorization.json',
        headers: {
            'Authorization': 'Bearer ' + accessToken 
        },
        method: 'GET'
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode))  
            defered.resolve(lib.safeParse(reslut));
        else 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));
    });

    return defered.promise;    
}