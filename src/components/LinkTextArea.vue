<script lang="ts">
import { defineComponent, ref } from "vue";
import { isIos, iosCopyToClipboard } from "../utils/ios-utils";
export default defineComponent({
  setup() {
    const textArea = ref<HTMLTextAreaElement>();

    return { textArea };
  },
  props: { value: String },
  methods: {
    assignInputRef(el: any) {
      if (el instanceof HTMLTextAreaElement) {
        this.textArea = el;
      }
    },
    copyLink() {
      if (this.textArea instanceof HTMLTextAreaElement) {
        if (isIos()) {
          iosCopyToClipboard(this.textArea);
        } else {
          /* Select the text field */
          this.textArea.select();
          this.textArea.setSelectionRange(0, 99999); /* For mobile devices */

          /* Copy the text inside the text field */
          navigator.clipboard.writeText(this.textArea.value);
        }
      }
    },
  },
});
</script>
<template>
  <div class="form__group field">
    <label class="form__label">Direct Message Link</label>
    <textarea
      class="form__field"
      :value="$props.value"
      :ref="assignInputRef"
      readonly
      @focus="
        (e:any) => {
          e.target.select();
        }
      "
    />
  </div>
  <div class="actions-container">
    <a :href="$props.value" target="_blank">
      <div class="btn" @click="copyLink">Open in WhatsApp</div>
    </a>
    <div class="btn copy-button" @click="copyLink">Copy</div>
  </div>
</template>
<style scoped>
@import "../assets/stylesheets/shared-styles.css";

.btn {
  border: none;
  padding: 18px;
  font-family: "Rubik", sans-serif;
  cursor: pointer;
  text-transform: uppercase;
  background: #2d3b55;
  color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 0;
  letter-spacing: 0.2px;
  outline: 0;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  font-size: 16px;
}

.actions-container {
  margin: 20px -35px -35px;
  display: flex;
}
.actions-container > a {
  flex-grow: 1;
}
.copy-button {
  background-color: #e8e9ec;
  color: #777;
  flex-grow: 1;
}
</style>
