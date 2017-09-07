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
        let requestBody,
         body,
         head,
         chunks = [],
         totallength = 0;

        if (ctx.request.body) {
            console.log(ctx.request.header['content-type'])
            if (ctx.request.header['content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
                requestBody = query.stringify(ctx.request.body)
            } else if (ctx.request.header['content-type'].indexOf('application/json') > -1) {
                requestBody = JSON.stringify(ctx.request.body)
            } else if (ctx.request.header['content-type'].indexOf('multipart/form-data') > -1) {
                requestBody = Buffer.from(JSON.stringify(ctx.request.body))
            } else {
                requestBody = JSON.stringify(ctx.request.body)
            }
            options.headers['Content-Length'] = Buffer.byteLength(requestBody)
        }

        const req = http.request(options, (res) => {
            res.on('data', (chunk) => {
                chunks.push(chunk);
                totallength += chunk.length;
            })

            res.on('end', () => {
                body = Buffer.concat(chunks, totallength);
                head = res.headers;
                resolve({head, body});
            })
        })

        ctx.request.body && req.write(requestBody);
        req.end();
    })
}

const httpHandle = async(ctx) => {
    let content = await httpRequest(ctx);
    ctx.type = content.head['content-type'];
    ctx.length = content.head['content-length'];
    ctx.body = content.body;
}


module.exports = {
    httpHandle
}