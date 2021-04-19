import axios from "axios";
import Options from '../options';

export default class ListingService {

    createListing(listing) {
        return new Promise((res, rej) => {
            //TODO: create new listing
            rej(new Error("Not Implemented"));
        });
    }

    updateListing(listing) {
        return new Promise((res, rej) => {
            //TODO: update listing
            rej(new Error("Not Implemented"));
        });
    }

    getListing(location) {
        return new Promise ((res, rej) => {
            if (!location){
                return rej([]);
            }

            axios.get(Options.RootApiUrl + "/nearby").then((response) => {
                res(response.data);
            }).catch((err) => rej(err));

        });
    }

    getLocalListings(filename) {
        console.log(`Getting listings from ${filename}`)

        return new Promise((res, rej) => {
            axios.get(filename).then((response) => {
                res(response.data);
            }).catch((err) => rej(err));
        });
    }

}