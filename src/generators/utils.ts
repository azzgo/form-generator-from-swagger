import { defineComponent } from "@vue/composition-api";
import { VueConstructor } from "vue/types/umd";
import { ISchema } from ".";
import { UNKNOWN_WIDGET } from "./constants";
import { store } from "./store";

/**
 * @param type: 接受格式为 ${type}:${format}?[enum]
 * @param comp: 合法的 Vue 组件
 * */
export function registerComponent<
  Widget extends VueConstructor = VueConstructor
>(type: string, comp: Widget) {
  store.widgets.set(type, comp);
}

registerComponent(
  UNKNOWN_WIDGET,
  defineComponent({
    name: UNKNOWN_WIDGET,
    render(h) {
      return h("div", null, UNKNOWN_WIDGET);
    },
  }) as unknown as VueConstructor
);

export function getWidget<Widget extends VueConstructor = VueConstructor>(
  schema: ISchema
): Widget | undefined {
  let Widget: Widget;
  if (schema.widget) {
    Widget = store.widgets.get(schema.widget) as Widget;
  } else if (schema.type) {
    if (schema.format) {
      Widget = store.widgets.get(`${schema.type}:${schema.format}`) as Widget;
    } else if (schema.enum) {
      Widget = store.widgets.get(`${schema.type}?enum`) as Widget;
    } else {
      Widget = store.widgets.get(schema.type) as Widget;
    }
  }

  if (!Widget) {
    console.info(`No found widget for [${schema.widget ?? schema.type}]`);
    return store.widgets.get(UNKNOWN_WIDGET) as Widget;
  }

  return Widget;
}
