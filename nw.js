/**
 * Created by AllenFeng on 2017/10/10.
 */
let Service = require('node-windows').Service;

let svc = new Service({
    name: 'ele4React',    //服务名称
    description: 'ele4React', //描述
    script: 'E:/mykoa/index.js' //nodejs项目要启动的文件路径
});

svc.on('install', () => {
    svc.start();
});

svc.install();