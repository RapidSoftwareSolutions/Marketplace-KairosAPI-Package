const Q       = require('q');
const lib     = require('../lib');
const request = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        accessToken,
        url
    } = req.body.args;
        
    let required = lib.parseReq({accessToken, url});

    if(required.length > 0) 
        throw new Object({
            status_code: 'REQUIRED_FIELDS', 
            status_msg:  'Please, check and fill in required fields.',
            fields: required
        });
    
    request({
        uri: url,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode)) {
            let resp = {};
            resp.reslut = lib.safeParse(reslut);

            if(response.headers['link']) {
                resp['next_page']   = response.headers['link'].split('<')[1].split('>')[0];
                resp['total_count'] = parseInt(response.headers['x-total-count']);
            }

            defered.resolve(resp);
        }
        else 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));
    });

    return defered.promise;    
}