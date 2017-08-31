/**
 * Created by AllenFeng on 2017/8/30.
 */
const http = require('http');
const query = require('querystring')

const host = '192.168.1.32';
const port = '1023';


const httpRequest = (ctx) => {
    return new Promise((resolve) => {
        delete ctx.request.header.host;
        const options = {
            host,
            port,
            path: ctx.request.url.substr(4, ctx.request.url.length),
            method: ctx.request.method,
            headers: ctx.request.header
        }
        let requestBody;
        let body;
        let head;

        if (ctx.request.header['content-type'] !== 'application/json') {
            requestBody = query.stringify(ctx.request.body)
        } else {
            requestBody = JSON.stringify(ctx.request.body)
        }
        ctx.request.body && (options.headers['Content-Length'] = Buffer.byteLength(requestBody))

        console.log(options, query.stringify(ctx.request.body), ctx.request.body);

        const req = http.request(options, (res) => {
            res.setEncoding('utf8');

            res.on('data', (chunk) => {

                console.log('chunk', chunk);
                body = chunk;
                head=res.headers;
                resolve({head,body});
            })

            res.on('end', () => {

            })
        })

        ctx.request.body && req.write(requestBody);
        req.end();
    })
}

const httpHandle = async(ctx) => {
    let content = await httpRequest(ctx);
    console.log(content)
    ctx.type=content.head['content-type'];
    ctx.body = content.body;
}


module.exports = {
    httpHandle
}