const request = require("request");

export default class GeocodeService {

    constructor({ apiKey }) {
        this.apiKey = apiKey
        this.geocode = this.geocode.bind(this)
    }

    geocode(adddress) {
        return new Promise((res, rej) => {
            if (!adddress) return rej("No address")

            const options = { sensor: false, address: adddress, key: this.apiKey }
            const uri = "http" + (this.apiKey ? "s" : "") + "://maps.googleapis.com/maps/api/geocode/json"

            request({
                uri: uri,
                qs: options
            }, (err, resp, body) => {
                if (err) return rej(err);

                var result;
                try {
                    result = JSON.parse(body);
                } catch (err) {
                    rej(err);
                    return;
                }

                res(result);
            });
        })
    }

}