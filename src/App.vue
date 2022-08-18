<script lang="tsx">
import Vue from "vue";
import { ISchema } from "./generators";
import { cloneDeep, get } from "lodash";
import { parseSchema } from "./generators";
import Form from "./form/form.vue";

let editor: any;

export default Vue.extend({
  name: "App",
  props: {
    swaggerJSON: {
      type: Object,
      required: true,
    },
  },
  data() {
    const jsonPath = "paths./applications/bulk-audit.post.parameters.0.schema";

    return {
      path: jsonPath,
      schema: get(cloneDeep(this.swaggerJSON), jsonPath) as ISchema,
      form: {},
    };
  },
  mounted() {
    editor = new (window as any).JSONEditor(
      document.getElementById("json-viewer"),
      {
        mode: "view",
      }
    );

    editor.set(this.schema);
  },
  computed: {
    fields() {
      return parseSchema(this.schema);
    },
    formValueFormat() {
      try {
        return JSON.stringify(this.form, null, 2);
      } catch (e) {
        return "error";
      }
    },
  },
  watch: {
    schema(val: ISchema) {
      editor.set(val);
    },
  },
  methods: {
    updateScheme() {
      if (!this.path || this.path?.trim()?.length === 0) {
        this.schema = cloneDeep(this.swaggerJSON);
        return;
      }
      this.schema = get(cloneDeep(this.swaggerJSON), this.path) as ISchema;
    },
  },
  // eslint-disable-next-line
  render(h) {
    return (
      <div id="app">
        <div class="flex-1">
          <div class="flex">
            <input class="flex-1" name="path" v-model={this.path} />
            <button onClick={this.updateScheme}>更新 PATH</button>
          </div>
          <div>
            <Form v-model={this.form}>
              {this.fields.map((field: any) => {
                return <field.Widget key={field.name.toString()} />;
              })}
            </Form>
            <div>
              <h4>form value</h4>
              <pre>{this.formValueFormat}</pre>
            </div>
          </div>
        </div>
        <div class="flex-1" id="json-viewer"></div>
      </div>
    );
  },
});
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  height: 100vh;
}

.flex {
  display: flex;
}

.flex-1 {
  flex: 1;
}
</style>
