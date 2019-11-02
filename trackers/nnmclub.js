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

    body.each((i, el) => {
        const row = {}
        const td = $(el).find('td')

        td.each(function (i, el) {
            if (i == 0) return;
            row[header[i]] = filter($(el).text())
        })
        rows.push(row)
    })

    return rows
}

module.exports = {
    host: 'nnmclub.to',
    async search(title) {
        const res = await needle('get', `http://${this.host}/forum/tracker.php?${qs.stringify({ nm: title })}`)
        if (res.statusCode == 301) return { error: new Error("Use vpn!") }

        const torrents = this.parse(res.body)

        return torrents
    },
    parse(body) {
        const $ = cheerio.load(body)

        const table = $('table[class="forumline tablesorter"]')
        
        return parseTable($, table.find('thead th'), table.find('tbody tr'))
    }
}