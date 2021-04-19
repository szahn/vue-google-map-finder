import Vuex from 'vuex'
import ListingService from "../services/listingService";
import transformListing from "../util/listingTransforms";

const storeFactory = () => new Vuex.Store({

    state: {
        center: null,
        isBusy: false,
        listingLookup: {},
        clusteredMarkers: {},
        selectedListing: null,
        isMapReady: false,
        errors: []
    },

    mutations: {

        pushError(state, {err, title}) {
            if (!err) return;

            const errMessage = (err instanceof Error) ? err.message : err;
            state.errors.push({
                message: errMessage, 
                title: title ?? "Error", 
                timestamp: new Date()
            });
        },

        popError(state) {
            if (state.errors.length) state.errors.pop();
        },

        //Map is ready is listing are loaded and a center coordinate is provided
        checkMapReadiness(state){
            state.isMapReady = !state.isMapReady && state.center;
        },

        centerOn(state, cords){
            state.center = cords;
        },

        selectListing(state, opts) {
            const selection = state.listingLookup[opts.id];
            if (!selection){
                state.selectedListing = null;
                return;
            }

            state.selectedListing = selection;
            if (opts.centerOn) {
                state.center = selection.position;
            }
        },

        fillListing(state, listing) {           
            /*TODO: this is not optimized at all. By setting the listing every time we pan, we risk running the garbage collector.
            We to diff the current listings so that only new markers are added. In addition, we should avoid duplicating listings
            in more than one memory space, so use a lookup table.*/
            const transformedListing = transformListing(listing);
            state.listingLookup = transformedListing.listingLookup;
            state.clusteredMarkers = transformedListing.clusteredMarkers       
        },

        toggleBusyIndicator(state, isBusy) {
            state.isBusy = isBusy
        }

    },

    actions: {

        updateListings(context, location) {
            const listingService = new ListingService();
            context.commit("toggleBusyIndicator", true);
            listingService.getListing(location).then((listing) => {
                context.commit("fillListing", listing);

            }).catch((err) => {
                context.commit("pushError", {err, title: "Error Updating"});
            }).finally(() => {
                context.commit("toggleBusyIndicator", false);
            });
        },

        loadListingAsync(context, {selectionId, listingUri, location}) {

            const listingService = new ListingService();

            context.commit("toggleBusyIndicator", true);

            const getListingFn = listingUri ? () => listingService.getLocalListings(listingUri) : () => listingService.getListing(location);

            getListingFn().then((listing) => {

                    context.commit("fillListing", listing);

                    if (selectionId) {
                        context.commit("selectListing", {id: selectionId, centerOn: true});
                    }
                })
                .catch((err) => {
                    context.commit("pushError", {err, title: "Error Loading"});
                })
                .finally(() => {
                    context.commit("toggleBusyIndicator", false);
                    context.commit("checkMapReadiness");
                });

        }

    }
});

export default storeFactory;