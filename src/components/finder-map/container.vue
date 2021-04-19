<template>
  <div class="app-container">
    <Map
      v-if="isMapReady"
      v-bind:center="center"
      zoomLevel="10"
      @listing-selected="onSelection"
      v-bind:clusteredMarkers="clusteredMarkers"
      v-bind:listingLookup="listingLookup"
      :onMapLocationChanged="onMapLocationChanged"
      v-bind:selection="selection"/>

    <MapNavigation @location-change="onLocationChange" 
      :onGroupEditorClicked="onCreateEditGroupClicked"/>

    <transition name="pop-up">
      <MapDetail
        v-if="selection"
        v-bind:selection="selection"
        @contact-clicked="onContactClicked"/>
    </transition>

    <transition name="fade">
      <ContactDetailForm
        v-if="showContactForm"
        v-bind:selection="selection"
        @close-form="onContactCloseClicked"/>
    </transition>

    <BusySpinner v-if="isBusy" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Map from "./map.vue";
import MapNavigation from "./mapNavigation.vue";
import MapDetail from "./mapDetail.vue";
import ContactDetailForm from "./contactDetailForm";
import BusySpinner from "../busySpinner";
import Options from '../../options';
import {throttle} from 'lodash';

export default {
  name: "MapFinder",

  components: {
    Map,
    MapNavigation,
    MapDetail,
    ContactDetailForm,
    BusySpinner,
  },

  data: () => {
    return {
      showContactForm: false
    };
  },

  computed: mapState({
    center: state => state.center,
    isBusy: (state) => state.isBusy,
    isMapReady: state => state.isMapReady,
    listingLookup: (state) => state.listingLookup,
    clusteredMarkers: (state) => state.clusteredMarkers,
    selection: (state) => state.selectedListing,
    errors: (state) => state.errors
  }),

  mounted() {
    this.$store.commit('centerOn', Options.StartLocation);

    if (Options.StaticListingFilename) {
      this.$store.dispatch('loadListingAsync', {
        selectionId: this.$route.query.id, 
        listingUri: Options.StaticDataRootPath + Options.StaticListingFilename,
        location: null
      });    
    }
    else {
      this.$store.dispatch('loadListingAsync', {
        selectionId: this.$route.query.id, 
        listingUri: null,
        location: Options.StartLocation
      });    
    }

    const that = this;
    setInterval(() => {
      if (that.errors.length) {
        const err = that.errors[0];

        that.$bvToast.toast(err.message, {
          title: err.title,
          variant: 'danger',
          solid: true
        });

        that.$store.commit("popError");
      }
    }, 500);
  },

  methods: {
    onMapLocationChanged: throttle(function() {
      //TODO: refresh nearby listings based on updated location
    }, 3000),

    onCreateEditGroupClicked() {
      this.showContactForm = false;
    },
    onContactCloseClicked() {
      this.showContactForm = false;
    },
    onContactClicked() {
      this.showContactForm = true;
    },
    onSelection(id) {
      this.$router.push({
        path: "/",
        query: {
          id,
        },
      });
    },

    onLocationChange(loc) {
      this.$store.commit('centerOn', loc);
    },

  },

  watch: {
    $route(to) {
      const toId = to.query.id;
      const opts = {id: toId, centerOn: true};
      this.$store.commit("selectListing", opts);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-container {
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.pop-up-enter-active,
.pop-up-leave-active {
  transition: all 0.25s ease-in-out;
}

.pop-up-enter, .pop-up-leave-to /* .fade-leave-active below version 2.1.8 */ {
  bottom: -100px;
}
</style>
