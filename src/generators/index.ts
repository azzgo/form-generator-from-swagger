export * from "./type";
import { registerComponent } from "./utils";
import { parseSchema } from "./paster";

import Input from "./widgets/Input.vue";
import NumberComp from "./widgets/Number.vue";
import Textarea from "./widgets/Textarea.vue";
import Select from "./widgets/Select.vue";
import InputDatetime from "./widgets/InputDatetime.vue";
import VoidWidget from "./widgets/Void.vue";

// default widgets binding
registerComponent("string", Input);
registerComponent("number", NumberComp);
registerComponent("text", Textarea);
registerComponent("string:datetime", InputDatetime);
registerComponent("array", Select);
registerComponent("string?enum", Select);
registerComponent("void", VoidWidget);

export * from "./type";
export { registerComponent, parseSchema };
export { UNKNOWN_WIDGET } from "./constants";
