const nnmclub = require('./templates/nnmclub.js')
const rutor = require('./templates/rutor.js')

async function search(title) {
    var nnm = await nnmclub(title)
    var rut = await rutor(title)
    var res = nnm.concat(rut)
    return res
}

module.exports = search