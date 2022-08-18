<template>
  <input
    :value="value"
    @change="handleChange"
    class="u-full-width"
    type="datetime"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "InputDatetimeWidget",
  props: {
    value: String,
  },
  methods: {
    handleChange(event: any) {
      this.$emit("change", event.target.value);
    },
  },
});
</script>
