import { Meteor } from "meteor/meteor";
import Vue from "vue";
import VueMeteorTracker from "vue-meteor-tracker";
import Vuetify from "vuetify";
import router from "./router";
import "vuetify/dist/vuetify.min.css";
import AppComponent from "/imports/ui/App.vue";
import "@mdi/font/css/materialdesignicons.css";

Meteor.startup(() => {
  Vue.use(VueMeteorTracker);
  Vue.use(Vuetify);
  const vuetify = new Vuetify();
  new Vue({
    render: (h) => h(AppComponent),
    router,
    vuetify,
    icons: {
      iconfont: "mdi", // default - only for display purposes
    },
  }).$mount("main");
});
