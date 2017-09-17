/**
 * Created by AllenFeng on 2017/8/29.
 */
const fs = require('fs')
const Router = require('koa-router');
const {httpHandle} = require('../Infrastructure/httpHandle');
const koaBody = require('koa-body')({
    multipart :true,
    strict:false
});

//const body=require('koa-better-body')();
//const body = require('koa-better-body')();

const render = (page) => {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`
        fs.readFile(viewUrl, "binary", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

let api = new Router();

api.get('*', httpHandle)
    .post('*',koaBody, httpHandle)
    .put('*',koaBody, httpHandle).del('*',koaBody, httpHandle);

let common = new Router();
common.get('*', async (ctx) => {
    ctx.body = await render('index.html');
})

let router = new Router();
router.use('/api', api.routes(), api.allowedMethods());
router.use('/', common.routes(), common.allowedMethods());


module.exports = router;



