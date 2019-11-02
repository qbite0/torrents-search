const needle = require('needle')
const cheerio = require('cheerio')

async function search(title) {
    const res = await needle('get',`http://rutor.info/search/0/0/000/0/${encodeURIComponent(title)}`)
    const $ = cheerio.load(res.body)
    var rows = []
    const tr = $('tr.gai, tr.tum')
    tr.each(function (i, element) {
        const row = {}
        row.tracker = 'rutor'
        $(element).find('td').each(function (i, field) {
            const text = $(field).text()
            if (i == 0) row.date = text
            if (i == 1) row.name = text.replace('\n', '')
        })
        rows.push(row)
    })
    return rows
}

module.exports = search