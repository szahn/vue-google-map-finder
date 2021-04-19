import Options from '../options';
import {keyBy, groupBy} from 'lodash';

/**Create an optimized data structure so that:
 * 1. Listings are only stored in one place
 * 2. Listings can be looked up in constant time (by ID)
 * 3. Listings are grouped into clusters of physically related proximity.
 * 4. New listings can easily be inserted in real-time without re-building the entire object. 
 * */
export default function transformListing(listing) {

    const listingLookup = keyBy(listing, "id");

    /*Group listings by clusters (markers that are within close proximity of each other), in this case, cluster by neighborhood with city fallback*/
    const clusteredMarkers = groupBy(listing.map(buildMarker), 'cluster');

    return {
        listingLookup: listingLookup,
        clusteredMarkers: clusteredMarkers
    }

}

export function buildMarker(item) {
    return {
        id: item.id,
        position: item.position,
        thumbnail: `${Options.StaticDataRootPath}/images/marker.png`, /*hack to customize thumbnail for each marker to proper static image path*/
        cluster: item.neighborhood || item.city || item.state
    };
}