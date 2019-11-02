const needle = require('needle')
const cheerio = require('cheerio')

async function search(title) {
    const res = await needle('get',`http://nnmclub.to/forum/tracker.php?nm=${encodeURIComponent(title)}`)
    const $ = cheerio.load(res.body)
    var rows = []
    const tr = $('table[class="forumline tablesorter"] tbody tr')
    tr.each(function (i, element) {
        const row = {}
        row.tracker = 'nnmclub'
        $(element).find('td').each(function (i, field) {
            const text = $(field).text();
            if (i == 1) row.topic = text;
            if (i == 2) row.name = text;
            if (i == 3) row.author = text;
            if (i == 5) row.size = text
            if (i == 6) row.seaders = text;
            if (i == 9) row.date = text
        })
        rows.push(row)
    })
    return rows
}

module.exports = search;