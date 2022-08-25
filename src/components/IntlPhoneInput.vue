<script setup lang="ts"></script>
<script lang="ts">
import { ref } from "vue";
import intlTelInput from "intl-tel-input";
export const countryData = window.intlTelInputGlobals.getCountryData();
export default {
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  data() {
    const phoneInput = ref<HTMLInputElement>();
    return { phoneInput };
  },
  methods: {
    assignInputRef(el: any) {
      if (el instanceof HTMLInputElement) {
        this.phoneInput = el;
      }
    },
    updated() {
      if (this.phoneInput) {
        const iti = window.intlTelInputGlobals.getInstance(this.phoneInput);
        this.$emit("update:modelValue", {
          phoneNumber: this.phoneInput.value,
          countryCode: iti.getSelectedCountryData().iso2,
        });
      }
    },
  },
  mounted() {
    if (this.phoneInput) {
      intlTelInput(this.phoneInput);
      const iti = window.intlTelInputGlobals.getInstance(this.phoneInput);
      iti.setCountry(this.$props.modelValue.countryCode || "IN");
      iti.setNumber(this.$props.modelValue.phoneNumber || "");
      this.phoneInput.addEventListener("countrychange", this.updated);
      this.phoneInput.addEventListener("change", this.updated);
    }
  },
};
</script>

<template>
  <div class="form__group field">
    <label class="form__label">WhatsApp Phone Number</label>
    <input
      type="tel"
      :ref="assignInputRef"
      class="form__field"
      @input="updated"
      placeholder="1234567890"
    />
  </div>
</template>

<style>
@import "intl-tel-input/build/css/intlTelInput.css";
</style>

<style scoped>
@import "../assets/stylesheets/shared-styles.css";
</style>
