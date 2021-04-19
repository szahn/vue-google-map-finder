<template>
  <div class="pre-contact-detail-form">
    <div class="contact-detail-form-container">
      Contact {{ selection.title }}

      <div>
        <BFormGroup
          id="fieldset-message"
          label-size="sm"
          label-cols-sm="12"
          label-cols-lg="12"
          content-cols-sm
          content-cols-lg="12"
          description="Let us know your message"
          label="Your message"
          label-for="input-message">
          <b-form-textarea
            rows="3"
            max-rows="7"
            v-model="messagebody"
            id="input-message"></b-form-textarea>
        </BFormGroup>

        <BButton
          size="sm"
          variant="primary"
          style="margin-right: 12px"
          @click="onSendClicked">Send</BButton>
        <BButton size="sm" @click="onCloseClicked">Close</BButton>
      </div>
    </div>
  </div>
</template>

<script>
import ContactService from "../../services/contactService";

const service = new ContactService();

export default {
  name: "ContactDetailForm",

  props: {
    selection: Object,
  },

  data() {
    return {
      messagebody: "",
    };
  },

  methods: {
    onSendClicked() {
      const contactId = this.selection.id;

      service
        .sendMessage(contactId, this.messagebody)
        .then(() => {
          this.messagebody = "";
          this.$emit("close-form");
        })
        .catch((err) => {
          this.$store.commit("pushError", {err, title: "Failed to send message"});
        });
    },

    onCloseClicked() {
      this.messagebody = "";
      this.$emit("close-form");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pre-contact-detail-form {
  background: rgba(255, 255, 255, 0.6);
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 2;
}

.contact-detail-form-container {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  width: 400px;
  margin: 0 auto;
  margin-top: 250px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  z-index: 3;
}
</style>
