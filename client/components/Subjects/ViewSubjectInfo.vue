<template>
  <div>
    <v-card>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Subject name</th>
              <th class="text-left">Students</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getSubjectInformation" :key="item._id">
              <td>{{ item.subject_name }}</td>
              <td>{{ item.students }}</td>
              <td>
                <v-btn
                  icon
                  @click="getInformationInModal(item)"
                  color="amber lighten-1"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn
                  icon
                  @click="deleteInfo(item._id)"
                  color="pink lighten-1"
                  class="white--text"
                  ><v-icon>mdi-delete</v-icon></v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Edit information</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Subject name"
                      v-model="subject_name"
                      required
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
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
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="hide"> Close </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="getEditedInformationFromModal"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Subjects } from "../../../imports/api/Models";
export default {
  data() {
    return {
      dialog: false,
      _id: "",
      subject_name: "",
      students: "",
      items: [],
    };
  },
  meteor: {
    getSubjectInformation() {
      return Subjects.find({}).fetch();
    },
  },
  methods: {
    deleteInfo(subjectId) {
      Meteor.call("deleteSubjectInfo", subjectId, (err, res) => {
        if (err) {
          console.log("Something went wrong");
        } else {
          this.isOpen = true;
          this.text = "Deleted successfully";
        }
      });
    },
    getInformationInModal(subject) {
      this.dialog = true;
      this._id = subject._id;
      this.subject_name = subject.subject_name;
      this.students = subject.students;
    },
    getEditedInformationFromModal() {
      this.dialog = false;
      const information = {
        _id: this._id,
        subject_name: this.subject_name,
        students: this.students,
      };
      Meteor.call("updateSubjectInfo", information, (err, res) => {
        if (err) {
          console.log("Something went wrong");
        } else {
          console.log("Updated successfully");
        }
      });
      console.log(information);
    },
    hide() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>