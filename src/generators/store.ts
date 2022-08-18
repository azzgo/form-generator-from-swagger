import { reactive } from "vue";

export const store = reactive({
  widgets: new Map<string, unknown>(),
});
