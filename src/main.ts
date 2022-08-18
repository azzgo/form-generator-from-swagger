import Vue from "vue";

import VueCompositionAPI from "@vue/composition-api";

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);

import SwaggerClient from "swagger-client";
import originSwaggerJSON from "./swagger.json";
import App from "./App.vue";

SwaggerClient.resolve({
  spec: originSwaggerJSON,
  allowMetaPatches: false,
}).then((result: any) => {
  if (result?.spec && result?.errors.length === 0) {
    new Vue({
      render: (h) => h(App, { props: { swaggerJSON: result.spec } }),
    }).$mount("#app");
  }
});
