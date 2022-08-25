<script setup lang="ts">
import IntlPhoneInput, { countryData } from "./IntlPhoneInput.vue";
import LinkTextArea from "./LinkTextArea.vue";
</script>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      contact: { countryCode: "IN", phoneNumber: "" },
      message: "",
    };
  },
  computed: {
    waLink() {
      const { dialCode = "" } =
        countryData.find(
          (country) => country.iso2 === this.contact.countryCode
        ) || {};
      return `https://wa.me/${dialCode}${this.contact.phoneNumber}${
        this.message ? `?text=${this.message}` : ""
      }`;
    },
  },
});
</script>

<template>
  <form>
    <div class="number-input-container">
      <IntlPhoneInput v-model="contact" />
    </div>
    <div>
      <div class="form__group field">
        <label class="form__label">Message (Optional)</label>
        <textarea class="form__field" v-model="message" placeholder="e.g. Hi" />
      </div>
    </div>
    <div v-if="contact.phoneNumber.length > 0" class="link-container">
      <LinkTextArea :value="waLink" />
    </div>
  </form>
</template>

<style scoped>
@import "../assets/stylesheets/shared-styles.css";
</style>
