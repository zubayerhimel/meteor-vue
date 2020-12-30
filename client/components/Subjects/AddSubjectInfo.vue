<template>
  <div>
    <v-form ref="form" v-model="valid" @submit.prevent="addInformation">
      <v-subheader>Add subject information</v-subheader>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="subject_name"
            outlined
            label="Subject name"
            :rules="subjectRules"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="students"
            :items="items"
            attach
            outlined
            label="Student name"
            multiple
          ></v-select>
        </v-col>
      </v-row>
      <div class="d-flex justify-center">
        <v-btn
          :disabled="!valid"
          class="white--text ttn"
          color="blue darken-2"
          @click="addInformation"
          elevation="1"
          >Add information</v-btn
        >
      </div>
    </v-form>
    <v-snackbar v-model="isOpen" color="success" top right>
      <span class="text-center">
        {{ text }}
      </span>
    </v-snackbar>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Students } from "../../../imports/api/Models";
export default {
  data: () => ({
    valid: false,
    isOpen: false,
    text: "",
    items: [],
    students: "",
    subject_name: "",
    subjectRules: [(v) => !!v || "Subject is required"],
  }),
  meteor: {
    getStudentNames() {
      let studentInfo = Students.find({}).fetch();
      let names = studentInfo.map((el) => el.name);
      this.items = names;
    },
  },
  methods: {
    addInformation() {
      const subjectInformation = {
        subject_name: this.subject_name,
        students: this.students,
      };
      console.log(subjectInformation);
      Meteor.call("addSubjectInfo", subjectInformation, (err, res) => {
        if (err) {
          console.log("Something went wrong");
        } else {
          this.isOpen = true;
          this.text = "Information added successfully";
        }
      });
    },
  },
};
</script>

<style scoped>
.ttn {
  text-transform: none;
}
</style>
