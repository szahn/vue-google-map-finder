<template>
  <div class="map-navigation-container">
    <BForm v-on:submit="formSubmit">
<b-container fluid class="text-light text-center">
  <b-row class="mb-3">
    <b-col>
        <BFormInput
          id="input-1"
          type="text"
          class=""
          v-model="searchTerm"
          placeholder="Search for location"
          required></BFormInput>
    </b-col>
    <b-col cols="2" style="text-align: right; margin-right: 10px;">
          <b-dropdown id="dropdown-1" class="" right>
            <template #button-content>
              <font-awesome-icon icon="bars" />
            </template>
            <b-dropdown-item @click="onGroupEditorClicked">Create a Listing</b-dropdown-item>
            <b-dropdown-item>Edit your Listings</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Go to My City</b-dropdown-item>
          </b-dropdown>
    </b-col>
  </b-row>
</b-container>
    </BForm>

  </div>
</template>

<script>
import { BForm, BFormInput, BFormGroup } from "bootstrap-vue";
import GeocodeService from '../../services/geocodeService';
import Options from '../../options';

const geocoder = new GeocodeService({apiKey: Options.GoogleApiKey});

export default {
  name: "MapNavigation",

  data() {
    return {
      searchTerm: ''
    }
  },

  methods: {
    formSubmit: function (e) {
      const address = this.searchTerm;
      this.searchTerm = "";

      geocoder.geocode(address).then((result) => {
        if (result && result.results && result.results.length) {
          const loc = result.results[0]
          const lat = loc.geometry.location.lat
          const lng = loc.geometry.location.lng
          this.$emit('location-change', {lat, lng})
        }

      }).catch((err) => {
          this.$store.commit("pushError", {err, title: "Failed to search"});
      });

      e.preventDefault();
    }
  },

  props: {
    onGroupEditorClicked: Function
  },
  
  components: {
    BForm,
    BFormInput,
    BFormGroup
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-navigation-container {
  position: absolute;
  left: 10px;
  right: 10px;
  background: #eee;
  padding: 10px 10px 0px 10px;
  margin: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  border-radius: 12px;
  min-height:100px;
}
</style>
