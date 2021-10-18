import Vue from "vue";
const components = {
  //Inputs
  TextField: () => import("@/components/Inputs/TextField.vue"),
  SelectField: () => import("@/components/Inputs/SelectField.vue"),

  // Button
    Button: () => import("@/components/Button/Button.vue"),

    // LOADER 
     Loader: () => import("@/components/Loader.vue")
};

Object.entries(components).forEach(([name, component]) =>
  Vue.component(name, component)
);
