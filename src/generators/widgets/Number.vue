<template>
  <input
    :value="value"
    @change="handleChange"
    class="u-full-width"
    type="number"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NumberWidget",
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
