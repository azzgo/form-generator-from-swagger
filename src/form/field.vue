<template>
  <div>
    <label>{{ label }}</label>
    <slot v-bind="fieldContext" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { fieldContextKey } from "./enum";

export default defineComponent({
  name: "azz-field",
  props: {
    name: {
      type: [String, Array],
      require: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  inject: {
    fieldContext: {
      from: fieldContextKey,
      default: () => ({}),
    },
  },
});
</script>
