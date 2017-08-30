/**
 * Created by AllenFeng on 2017/8/30.
 */
const http = require('http');

const host = '192.168.1.32';
const port = '1023';

const httpRequest = (ctx) => {
    debugger;
    delete ctx.request.header.host;
    const options = {
        host,
        port,
        path: ctx.request.url.substr(4, ctx.request.url.length),
        method: ctx.request.method,
        headers: ctx.request.header
    }

    console.log(options);

    const req = http.request(options, (res) => {
        let body = '';

        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            console.log('chunk',chunk);
            body = chunk;
        })

        res.on('end', () => {
            console.log(ctx,body)
            //ctx.type=res.headers['content-type'];
            ctx.body=body;
        })
    })

    ctx.request.body && req.write(ctx.request.body);
    req.end();
}


const getHandle = async (ctx) => {
    await httpRequest(ctx)
}

const postHandle = (ctx) => {

}

const putHandle = (ctx) => {

}

const deleteHandle = (ctx) => {

}


module.exports = {
    getHandle,
    postHandle,
    putHandle,
    deleteHandle
}