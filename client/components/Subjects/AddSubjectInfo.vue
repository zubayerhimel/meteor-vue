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
import { Students, Subjects } from "../../../imports/api/Models";
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
      this.studentInformations = Students.find({}).fetch();
      const studentNames = this.studentInformations.map((el) => el.name);
      this.items = studentNames;
    },
  },
  methods: {
    addInformation() {
      const students = this.students;
      const subjectInformation = {
        subject_name: this.subject_name,
        students: students || [],
      };

      const checkPreviousData = Subjects.findOne({
        subject_name: this.subject_name,
      });
      if (checkPreviousData && checkPreviousData !== null) {
        for (let i = 0; i < students.length; i++) {
          // console.log(students[i]);
          if (checkPreviousData.students.indexOf(students[i]) === -1) {
            checkPreviousData.students.push(students[i]);
          }
        }
        Meteor.call("updateSubjectInfo", checkPreviousData, (err, res) => {
          if (err) {
            console.log("Something went wrong");
          } else {
            this.isOpen = true;
            this.text = "Information added successfully";
          }
        });
      } else {
        Meteor.call("addSubjectInfo", subjectInformation, (err, res) => {
          if (err) {
            console.log("Something went wrong");
          } else {
            this.isOpen = true;
            this.text = "Information added successfully";
          }
        });
      }

      for (let i = 0; i < this.students.length; i++) {
        console.log(this.students[i]);
        let student_info = Students.findOne({ name: this.students[i] });
        console.log(student_info);
        if (student_info.subjects.indexOf(this.subject_name) === -1) {
          student_info.subjects.push(this.subject_name);
        }
        Students.update({ _id: student_info._id }, student_info);
      }
    },
  },
};
</script>

<style scoped>
.ttn {
  text-transform: none;
}
</style>
