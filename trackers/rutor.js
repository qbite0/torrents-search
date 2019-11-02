const needle = require('needle')
const cheerio = require('cheerio')
const qs = require('querystring');

function filter(text) {
    return text.replace(/[^0-9A-zА-яёЁ ,]/, '').trim()
}

function parseTable($, head, body) {
    const header = []
    const rows = []

    head.each((i, el) => {
        header.push(filter($(el).text()))
    })

    body.each(function (i, el) {
        const row = {}
        const td = $(el).find('td')

        const h = [...header]
        if (td.length != header.length) h.splice(2, 0, "Комментарии")

        td.each(function (i, el) {
            row[h[i]] = filter($(el).text())
        })
        rows.push(row)
    })

    return rows
}

module.exports = {
    host: 'rutor.info',
    async search(title) {
        const res = await needle('get', `http://${this.host}/search/0/0/000/0/${encodeURIComponent(title)}`)
        if (res.statusCode == 301) return { error: new Error("Use vpn!") }

        const torrents = this.parse(res.body)

        return torrents
    },
    parse(body) {
        const $ = cheerio.load(body)

        const table = $('#index table')
        
        return parseTable($, table.find('tbody .backgr td'), table.find('tbody .gai, .tum'))
    }
}