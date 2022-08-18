import { set } from "vue";

export function setValue(obj: Record<string, any>, name: any, val: any) {
  innerSet(obj, name, val);
}

function innerSet(obj: Record<string, any>, name: any, val: any): any {
  const namePath = arrayfy(name);

  if (namePath.length === 0) {
    return obj;
  }

  if (namePath.length === 1) {
    const key = namePath[0];

    if (key in obj) {
      obj[key] = val;
    } else {
      set(obj, key, val);
    }
  }

  const [key, ...rest] = namePath;

  if (key in obj) {
    obj[key] = innerSet(obj[key], rest, val);
  } else {
    set(obj, key, innerSet(obj[key], rest, val));
  }
}

function arrayfy(thing: string | Array<string>): Array<string> {
  if (typeof thing === "string") {
    return [thing];
  }

  if (Array.isArray(thing)) {
    return thing;
  }

  return [];
}
