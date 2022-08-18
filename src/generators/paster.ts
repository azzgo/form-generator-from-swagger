import { defineComponent } from "@vue/composition-api";
import { IField, ISchema } from "./type";
import { getWidget } from "./utils";
import { nanoid } from "nanoid";
import Field from "../form/field.vue";

/**
 * @param schema: 需要解析的 Schema, 需要符合 JSON Schema 规范
 * @param name: 可选，当 Schema 是简单 Scheme 时（type 非 object & arrray），name 字段会促使生成 Field 配置
 **/
export function parseSchema<T extends ISchema = ISchema>(
  schema: T,
  path: Array<string | number> = []
): IField[] | IField {
  if (schema?.type === "object" && typeof schema.properties === "object") {
    return Object.keys(schema.properties)
      .map((propName) => {
        const curSchema: T = schema.properties[propName] as unknown as T;

        // 需要判断 widget 字段，防止 type[object] 存在对应组件的情况
        if (
          curSchema?.type === "object" &&
          typeof curSchema.properties === "object" &&
          !curSchema.widget
        ) {
          return parseSchema(curSchema, path.concat([propName]));
        }

        const Widget = getWidget(curSchema);
        const name = getNamePattern(propName, path);

        return {
          name,
          schema: curSchema,
          Widget: defineComponent({
            name: Widget && Widget.name + "_" + propName,
            props: {
              label: {
                type: String,
                default: "",
              },
            },
            render(h) {
              return h(Field, {
                props: {
                  name,
                  label: this.label || curSchema.title,
                },
                scopedSlots: {
                  default: function (props: any) {
                    return [
                      h(Widget, {
                        props: { value: props.value, schema: curSchema },
                        on: {
                          change: (val: any) => props.updateValue(name, val),
                        },
                      }),
                    ];
                  },
                },
              });
            },
          }),
        };
      })
      .flat() as unknown as IField[];
  }

  const Widget = getWidget(schema);

  if (schema.type === "void") {
    return {
      schema,
      Widget,
    } as IField;
  }

  const name = getNamePattern(nanoid(10), path);

  return {
    name,
    schema,
    Widget: defineComponent({
      name: Widget.name + "_" + name,
      props: {
        label: {
          type: String,
          default: "",
        },
      },
      render(h) {
        return h(Field, {
          props: { name, label: this.label || schema.title },
          scopedSlots: {
            default: function (props: any) {
              return [
                h(Widget, {
                  props: { value: props.value, schema },
                  on: { change: (val: any) => props.updateValue(name, val) },
                }),
              ];
            },
          },
        });
      },
    }) as unknown,
  } as IField;
}

function getNamePattern(
  name: string,
  path: Array<string | number>
): string | Array<string | number> {
  if (path.length === 0) {
    return name;
  }

  return path.concat([name]);
}
