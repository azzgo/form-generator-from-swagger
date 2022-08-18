import { IField, ISchema } from "../type";
import { registerComponent } from "../utils";
import { store } from "../store";
import Input from "../widgets/Input.vue";
import InputDatetime from "../widgets/InputDatetime.vue";
import Select from "../widgets/Select.vue";
import VoidWidget from "../widgets/Void.vue";

jest.mock("nanoid", () => ({
  nanoid: jest.fn(),
}));

const mockField = jest.fn();
jest.mock("../../form/field.vue", () => mockField);

import nanoid from "nanoid";

import { parseSchema } from "../paster";
import { DefineComponent } from "vue/types/v3-define-component";

beforeEach(() => {
  store.widgets.clear();
  mockField.mockClear();
});

describe("One layer JSON Schema", () => {
  test("Simple type Map to Field", () => {
    // prepare Schema
    const schema = { type: "string" } as ISchema;
    registerComponent("string", Input);
    jest.spyOn(nanoid, "nanoid").mockReturnValue("name");

    // when
    const field: IField = parseSchema(schema) as IField;

    // then
    expect(field.name).toEqual("name");
    expect(field.Widget).not.toBe(Input);
    expect(field.Widget.name).toEqual("InputWidget_name");
    expect(field.schema).toEqual({ type: "string" });
  });

  test("type format Map to Field", () => {
    // prepare Schema
    const schema = { type: "string", format: "datetime" } as ISchema;
    registerComponent("string:datetime", InputDatetime);
    jest.spyOn(nanoid, "nanoid").mockReturnValue("name");

    // when
    const field: IField = parseSchema(schema) as IField;

    // then
    expect(field.Widget).not.toBe(InputDatetime);
    expect(field.Widget.name).toEqual("InputDatetimeWidget_name");
    expect(field.schema).toEqual({ type: "string", format: "datetime" });
  });

  test("type enum Map to Field", () => {
    // prepare Schema
    const schema = { type: "string", enum: ["yes", "no"] } as ISchema;
    registerComponent("string?enum", Select);
    jest.spyOn(nanoid, "nanoid").mockReturnValue("name");

    // when
    const field: IField = parseSchema(schema) as IField;

    // then
    expect(field.Widget).not.toBe(InputDatetime);
    expect(field.Widget.name).toEqual("SingleSelect_name");
    expect(field.schema).toEqual({ type: "string", enum: ["yes", "no"] });
  });

  test("type void Map to Widget self", () => {
    // prepare Schema
    const schema = { type: "void" } as ISchema;
    registerComponent("void", VoidWidget);

    // when
    const field: IField = parseSchema(schema) as IField;

    // then
    expect(field.Widget).toBe(VoidWidget);
    expect(field.name).toBeUndefined();
  });
});

describe("nest JSON", () => {
  test("type['object'] properties should parsed", () => {
    // prepare Schema
    const schema = {
      type: "object",
      properties: {
        reason: {
          type: "string",
          enum: ["sick", "vocation", "others"],
        },
        period: {
          type: "object",
          properties: {
            startTime: {
              type: "string",
              format: "datetime",
            },
            endTime: {
              type: "string",
              format: "datetime",
            },
          },
        },
      },
    } as ISchema;
    registerComponent("string?enum", Select);
    registerComponent("string:datetime", InputDatetime);

    // when
    const fields: IField[] = parseSchema(schema) as IField[];

    // then
    expect(fields.length).toBeGreaterThan(0);
    expect(fields.map((it) => it.name)).toEqual([
      "reason",
      ["period", "startTime"],
      ["period", "endTime"],
    ]);
  });

  test("type['array'] map to Field select", () => {
    const schema = {
      type: "array",
      items: {
        type: "string",
      },
    } as ISchema;

    jest.spyOn(nanoid, "nanoid").mockReturnValue("name");
    registerComponent("array", Select);

    // when
    const field: IField = parseSchema(schema) as IField;

    expect(field.Widget.name).toEqual("SingleSelect_name");
  });
});
