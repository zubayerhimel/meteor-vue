import Vue from "vue";
import Router from "vue-router";
import StudentInfo from "../views/StudentInfo";
import SubjectInfo from "../views/SubjectInfo";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "StudentInfo",
      component: StudentInfo,
    },
    {
      path: "/subjectinfo",
      name: "SubjectInfo",
      component: SubjectInfo,
    },
  ],
});
