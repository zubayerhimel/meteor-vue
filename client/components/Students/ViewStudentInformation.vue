<template>
  <div>
    <div v-if="getStudentInformation.length === 0">
      <div class="text-center">
        <h1>No information found</h1>
      </div>
    </div>
    <v-card v-else>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Email</th>
              <th class="text-left">Phone number</th>
              <th class="text-left">Date of birth</th>
              <th class="text-left">Subjects</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in getStudentInformation.slice().reverse()"
              :key="item.name"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone_number }}</td>
              <td>{{ item.date }}</td>
              <td>
                <span v-for="(subject, index) in item.subjects" :key="index">
                  {{ subject }} ,
                </span>
              </td>
              <td>
                <v-btn
                  icon
                  @click="getInformationInModal(item)"
                  color="amber lighten-1"
                  ><v-icon>mdi-pencil</v-icon></v-btn
                >
                <v-btn
                  icon
                  @click="openConfirmModal(item._id)"
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
                      label="First name"
                      v-model="name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Email"
                      v-model="email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="Phone number"
                      v-model="phone_number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="Birthday date"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        ref="picker"
                        v-model="date"
                        :max="new Date().toISOString().substr(0, 10)"
                        min="1950-01-01"
                        @change="save"
                      ></v-date-picker>
                    </v-menu>
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
    <template>
      <v-row justify="center">
        <v-dialog v-model="confirmDialog" persistent max-width="390">
          <v-card>
            <v-card-title class="headline">
              Are you sure you want to delete information?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="confirmDialog = false">
                Cancel
              </v-btn>
              <v-btn color="red darken-1" text @click="deleteInfo">
                Delete
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <v-snackbar v-model="isOpen" color="pink" top right>
      <span class="center-text">
        {{ text }}
      </span>
    </v-snackbar>
  </div>
</template>



<script>
// import Snackbar from "../Snackbar";
import { Meteor } from "meteor/meteor";
import { Students } from "../../../imports/api/Models";
export default {
  data() {
    return {
      dialog: false,
      confirmDialog: false,
      _id: "",
      name: "",
      email: "",
      phone_number: "",
      date: null,
      text: "",
      isOpen: false,
      menu: false,
    };
  },
  meteor: {
    getStudentInformation() {
      let information = Students.find({}).fetch();
      console.log(information);
      return information;
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    deleteInfo() {
      Meteor.call("deleteStudentInfo", this._id, (err, res) => {
        if (err) {
          console.log("shows error toast");
        } else {
          console.log("Deleted successfully");
          this.isOpen = true;
          this.text = "Deleted successfully";
        }
      });
      this.confirmDialog = false;
    },
    openConfirmModal(studentId) {
      this.confirmDialog = true;
      this._id = studentId;
    },
    getInformationInModal(student) {
      this.dialog = true;
      this._id = student._id;
      this.name = student.name;
      this.email = student.email;
      this.phone_number = student.phone_number;
      this.date = student.date;
    },
    getEditedInformationFromModal() {
      this.dialog = false;
      const information = {
        _id: this._id,
        name: this.name,
        email: this.email,
        phone_number: this.phone_number,
        date: this.date,
      };
      Meteor.call("updateStudentInfo", information, (err, res) => {
        if (err) {
          console.log("show  error toast");
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