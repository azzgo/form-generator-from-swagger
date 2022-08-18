<template>
  <select :value="value" @change="handleChange" class="u-full-width">
    <option v-for="op in options" :key="op" :value="op">{{ op }}</option>
    <option></option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "SingleSelect",
  props: {
    value: {
      type: String,
    },
    schema: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    options() {
      if (!this.schema?.enum) {
        return [];
      }

      return this.schema.enum;
    },
  },
  methods: {
    handleChange(event: any) {
      this.$emit("change", event.target.value);
    },
  },
});
</script>
