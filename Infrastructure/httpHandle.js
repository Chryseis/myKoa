/**
 * Created by AllenFeng on 2017/8/30.
 */
const http = require('http');
const query = require('querystring');
const fs = require('fs');

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
        let requestBody='',
            body,
            head,
            chunks = [],
            fileFields,
            files,
            boundaryKey,
            boundary,
            endData,
            filesLength,
            totallength = 0;

        if (ctx.request.body) {
            console.log(ctx.request.header['content-type'])
            if (ctx.request.header['content-type'].indexOf('application/x-www-form-urlencoded') > -1) {
                requestBody = query.stringify(ctx.request.body);
                options.headers['Content-Length'] = Buffer.byteLength(requestBody)
            } else if (ctx.request.header['content-type'].indexOf('application/json') > -1) {
                requestBody = JSON.stringify(ctx.request.body);
                options.headers['Content-Length'] = Buffer.byteLength(requestBody)
            } else if (ctx.request.header['content-type'].indexOf('multipart/form-data') > -1) {
                fileFields = ctx.request.body.fields;
                files = ctx.request.body.files;
                boundaryKey = Math.random().toString(16);
                boundary = `\r\n----${boundaryKey}\r\n`;
                endData = `\r\n----${boundaryKey}--`;
                filesLength = 0;

                Object.keys(fileFields).forEach((key) => {
                    requestBody += boundary + `Content-Disposition:form-data;name=${key}\r\n\r\n${fileFields[key]}`;
                })

                Object.keys(files).forEach((key) => {
                    requestBody += `${boundary}Content-Type: application/octet-stream\r\nContent-Disposition: form-data; name=${key};filename=${files[key].name}\r\nContent-Transfer-Encoding: binary\r\n\r\n`;
                    filesLength += Buffer.byteLength(requestBody,'utf-8') + files[key].size;
                })

                options.headers['Content-Type'] = `multipart/form-data; boundary=--${boundaryKey}`;
                options.headers[`Content-Length`] = filesLength + Buffer.byteLength(endData);
            } else {
                requestBody = JSON.stringify(ctx.request.body)
                options.headers['Content-Length'] = Buffer.byteLength(requestBody)
            }
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

        if (fileFields) {
            let filesArr = Object.keys(files);
            let uploadConnt = 0;
            filesArr.forEach((key) => {
                let fileStream = fs.createReadStream(files[key].path);
                fileStream.on('end', () => {
                    fs.unlink(files[key].path);
                    uploadConnt++;
                    if (uploadConnt == filesArr.length) {
                        req.end(endData)
                    }
                })
                fileStream.pipe(req, {end: false})
            })
        } else {
            req.end();
        }

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