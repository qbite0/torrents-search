const Trackers = {
    "nnmclub": require('./trackers/nnmclub.js'),
    "rutor": require('./trackers/rutor.js'),
    "tfile": require('./trackers/tfile.js')
}

class Client {
    constructor(trackers) {
        this.trackers = []
        for (var i = 0; i < trackers.length; i++) {
            this.trackers.push(Trackers[trackers[i]])
        }
    }

    async search(title) {
        let torrents = []
        for (var i = 0; i < this.trackers.length; i++) {
            torrents = torrents.concat(await this.trackers[i].search(title))
        }
        return torrents
    }
}

module.exports = { Client }