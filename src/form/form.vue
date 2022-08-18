<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { get } from "lodash";
import { setValue } from "./valueUtils";
import { fieldContextKey } from "./enum";

export default defineComponent({
  name: "azz-form",
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  provide() {
    return {
      [fieldContextKey]: {
        updateValue: this.updateValue,
        getValue: this.getValue,
      },
    };
  },
  methods: {
    updateValue(namePath: any, val: any) {
      console.log(namePath, val);
      setValue(this.value, namePath, val);
    },
    getValue(namePath: string | string[]) {
      return get(this.value, namePath);
    },
  },
});
</script>
