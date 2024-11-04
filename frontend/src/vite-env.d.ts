/// <reference types="vite/client" />
/// <reference types="vue/auto-import-components" />
/// <reference types="vuetify" />

import "vuetify/types";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vuetify/lib/components" {}
