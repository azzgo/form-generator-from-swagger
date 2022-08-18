import { DefineComponent } from "vue/types/v3-define-component";

export interface IWidgetBaseSchema {
  type: "string" | "object" | "array" | "number" | "boolean" | "void";
  title?: string;
  widget?: string;
  enum?: Array<any>;
  format?: string;
  description?: string;
  items?: IWidgetBaseSchema;
  default?: unknown;
  column?: number;
  properties?: Record<string, unknown>;
}

export type ISchema<T extends IWidgetBaseSchema = IWidgetBaseSchema> = T;

export interface IField<T extends ISchema = ISchema> {
  name?: string | number | Array<string | number>;
  Widget: Vue.VueConstructor | DefineComponent;
  schema: T;
}
