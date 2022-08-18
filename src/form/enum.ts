export const fieldContextKey = Symbol("field-context");

export interface FieldContext {
  updateValue(name: string | Array<string>, value: any): void;
  getValue(name: string | Array<string>): any;
}
