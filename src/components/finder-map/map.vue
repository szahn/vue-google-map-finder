<template>
    <GmapMap v-if="ready" id="google-map-instance"
        :options="mapOptions"
        :center="center"
        :zoom="zoomLevelNumber"
        map-type-id="roadmap" class="map-container"
        @center_changed="onCenterChanged"
        @bounds_changed="onBoundsChanged">

      <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
      </gmap-info-window>

        <GmapCluster :key="cluster" v-for="(cluster) in Object.keys(clusteredMarkers)" :zoomOnClick="true" :options="{gridSize: 20, maxZoom: 17}">
          <gmap-custom-marker :marker="m.position"
              :key="m.id"
              v-for="(m) in clusteredMarkers[cluster]"
              :clickable="true"
              :draggable="false"
              alignment="center"
              @click.native="onMarkerClick(m.id)">
                <img class="map-marker" v-bind:src="m.thumbnail" v-bind:class="[selection && selection.id == m.id ? 'animated infinite bounce' : '']"/>
          </gmap-custom-marker>

        </GmapCluster>

        </GmapMap>
</template>

<script>
//import { gmapApi } from 'gmap-vue'
import GmapCustomMarker from 'vue2-gmap-custom-marker';

export default {
  name: "Map",
  components: {
    GmapCustomMarker,
  },  
  
  props: {
    selection: Object,
    onListingItemClicked: Function,
    onMapLocationChanged: Function,
    zoomLevel: {
      type: String,
      default: "7",
    },
    listingLookup: Object,
    clusteredMarkers: Object,
    center: Object
  },
  
  data: () => {
    return {
      ready: false,
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        content: '',
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35
        }
      },

      mapOptions: {
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
      },
    };
  },
  
  computed: {
    zoomLevelNumber() {
      return parseInt(this.zoomLevel, 10);
    }

  },

  async mounted() {
    this.ready = true;
  },


  methods: {
      onMarkerClick (id) {
          const marker = this.listingLookup[id];

          const isAlreadySelected = (this.selection && this.selection.id == id);

          if (!isAlreadySelected) {
            this.infoWindowPos = marker.position;
            this.infoOptions.content = marker.title;
            this.infoWinOpen = true;
            this.$emit('listing-selected', id);
          }
      },

      onBoundsChanged(e) {
        if (!e) return;

        const la = e.La;
        const ra = e.Ra;
        if (la && ra) {
          const bounds = {
            lat: [ra.g, ra.i],
            lng: [la.g, la.i]
          }
          this.onMapLocationChanged({bounds});
        }
      },

      onCenterChanged(e) {
        if (!e) return;

        const center = {
          lat: e.lat(),
          lng: e.lng()
        }

        this.onMapLocationChanged({center});
      },
  },

};
</script>

<style scoped>

#google-map-instance {
  position:absolute;
  left: 0px;
  top: 0px;
  bottom: 0;
  right:0px;
}

.map-marker{
  cursor:pointer;
}
</style>
