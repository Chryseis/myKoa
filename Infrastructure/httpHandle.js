/**
 * Created by AllenFeng on 2017/8/30.
 */
const http = require('http');
const query=require('querystring')

const host = '192.168.2.110';
const port = '1023';


const httpRequest = (ctx) => {
    return new Promise((resolve)=>{
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

        if(ctx.request.header['content-type']!=='application/json'){
            requestBody=query.stringify(ctx.request.body)
        }else{
            requestBody=JSON.stringify(ctx.request.body)
        }
        console.log(options,query.stringify(ctx.request.body),ctx.request.body);

        const req = http.request(options, (res) => {
            res.setEncoding('utf8');

            res.on('data', (chunk) => {
                console.log('chunk', chunk);
                body = chunk;
                resolve(body);
            })

            res.on('end', () => {
                console.log('响应中已无数据。')
            })
        })

        ctx.request.body && req.write(requestBody);
        req.end();
    })


}


const httpHandle = async(ctx) => {
    let body= await httpRequest(ctx);
    ctx.body=body;
}


module.exports = {
    httpHandle
}