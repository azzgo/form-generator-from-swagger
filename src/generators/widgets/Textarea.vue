<template>
  <textarea
    :value="value"
    class="u-full-width"
    :rows="5"
    @change="handleChange"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "TextWidget",
  props: {
    value: {
      type: String,
    },
  },
  methods: {
    handleChange(event: any) {
      this.$emit("change", event.target.value);
    },
  },
});
</script>
