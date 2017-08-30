/**
 * Created by AllenFeng on 2017/8/17.
 */
const path = require('path');
const Koa = require('koa');
const Static = require('koa-static');
const router = require('./router/koaRouter')
const app = new Koa();
const staticPath = './static';

app.use(Static(path.join(__dirname, staticPath)))

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, function () {
    console.log('app started at port 3000')
});
