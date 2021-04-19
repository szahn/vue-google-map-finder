<template>
  <div class="map-detail-container">

  <BCard no-body class="overflow-hidden">
    <BRow no-gutters>
      <!--
      <b-col md="3">
        <BCardImg src="https://groups-production.s3.amazonaws.com/uploads/group/header_image/1308607/medium_image-1606092621540.jpg" alt="Image" class="rounded-0" style="max-width: 300px;"></BCardImg>
      </b-col>
      -->
      <b-col md="12">
        <BCardBody>
          <button @click="onClose" type="button" aria-label="Close" class="close">×</button>
          <h4>{{selection.title}}</h4>
          <BCardText>            

              <p>{{selection.description}}</p>
              <div>
                <BButton variant="primary" @click="onContactClicked">Contact</BButton>
              </div>


          </BCardText>
        </BCardBody>
      </b-col>
    </BRow>
  </BCard>

  </div>
</template>

<script>
export default {
  name: 'MapDetail',
  props: {
    selection: Object
  },

  data () {
    return {
      showContactForm: false
    }
  },

  methods: {
    onClose() {
      this.$router.push({
          path: '/',
          query: {
            id: null
          }
      });
    },

    onContactClicked() {
      this.$emit("contact-clicked");
    }
  }
}
</script>
import { BModal, BForm, BRow, BCardImg, BCardBody, BCardText, BButton } from "bootstrap-vue";

<style scoped>

.map-detail-container {
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  border-radius: 12px;

  background: #eee;
  position: absolute;
  bottom: 10px;
  right: 10px;
  left: 0px;
  padding: 10px;
}

</style>
