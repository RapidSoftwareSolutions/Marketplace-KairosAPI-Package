const Q        = require('q');
const fs       = require('fs');
const lib      = require('../lib');
const path     = require('path');
const spawn    = require('child_process').spawnSync;
const request  = require('request');
const fileType = require('file-type');


module.exports = (req, res) => {
    const defered = Q.defer();

    req.body.args = lib.clearArgs(req.body.args);

    let { 
        accessToken,
        accountId,
        name, 
        file
    } = req.body.args;
        
    let required = lib.parseReq({accountId, accessToken, name, file});

    if(required.length > 0) 
        throw new Object({
            status_code: 'REQUIRED_FIELDS', 
            status_msg:  'Please, check and fill in required fields.',
            fields: required
        });

    let headers = {
        'Authorization': 'Bearer ' + accessToken,
    };

    let attach = spawn(process.execPath, [require.resolve('../lib/download.js'), file]);

    if(!attach.stderr.toString()) {
        let response = JSON.parse(attach.stdout.toString());
        var fn       = path.resolve('./lib', response.message);
        var upload   = fs.readFileSync(fn);

        headers['Content-Length']  = response.length;
        headers['Content-Type']    = fileType(upload).mime;
    } else {
        throw new Object({
            status_code: 'INTERNAL_PACKAGE_ERROR', 
            status_msg:  'Something went wrong inside the package. Please, call support.'
        });
    }
    
    request({
        uri: `https://3.basecampapi.com/${accountId}/attachments.json`,
        method: 'POST',
        headers: headers,
        qs: {name},
        body: upload
    }, (err, response, reslut) => {
        if(!err && (/20.*/).test(response.statusCode))  
            defered.resolve(lib.safeParse(reslut));
        else 
            defered.reject(lib.safeParse(err || reslut || response.statusCode));

        fs.unlink(fn, () => {});
    });

    return defered.promise;
}