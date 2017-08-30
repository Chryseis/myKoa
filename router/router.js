/**
 * Created by AllenFeng on 2017/8/21.
 */
const fs = require('fs')

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

const router = async(url) => {
    let view = 'index.html'
    switch (url) {
        case '/':
        view = 'index.html'
        break
        case '/index':
            view = 'index.html'
            break
        case '/todo':
            view = 'todo.html'
            break
        case '/404':
            view = '404.html'
            break
        case "/model":
            view='model.json'
        default:
            break
    }
    let html = await render(view)
    return html
}

module.exports=router;