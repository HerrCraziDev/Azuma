const KashimaRESTManager = require('../ratelimits/client/KashimaRequestManager.js');
const op = 'Walther-WA2000';

// I'm a fucking weeb so why not?
class TsundereUtil {
    static get op() {
        return op;
    }

    static Baka(ms) {
        return new Promise(res => ms ? setTimeout(res, ms) : setImmediate(res));
    }

    static GenerateIPCRequest() {
        return {
            op,
            // note to self, dont forget to send endpoint
            endpoint: null,
            // update is true when we send headers, while false if we just check
            update: false,
            // headers is needed when update is set to true, but if not then leave it
            headers: null
        };
    }

    static GenerateReplyInfo() {
        return {
            errored: false,
            name: null,
            message: null,
            stack: null
        };
    }

    static ReplaceClientRest() {
        const { Util } = require('kurasuta');
        Util.startCluster = manager => {
            const Cluster = require(manager.path);
            const cluster = new Cluster(manager);
            cluster.client.rest = new KashimaRESTManager(cluster.client, cluster.client.options._tokenType);
            return cluster.init();
        };
    }
}

module.exports = TsundereUtil;