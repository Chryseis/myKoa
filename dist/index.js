'use strict';

/**
 * Created by AllenFeng on 2017/8/17.
 */
var path = require('path');
var Koa = require('koa');
var Static = require('koa-static');
var router = require('./router/koaRouter');
var app = new Koa();
var staticPath = './static';

app.use(Static(path.join(__dirname, staticPath)));

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, function () {
  console.log('app started at port 3000');
});
//# sourceMappingURL=index.js.map