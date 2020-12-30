<template>
  <div>
    <div v-if="getSubjectInformation.length === 0">
      <h1 class="text-center">No information found</h1>
    </div>
    <v-card v-else>
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
              <td>
                <span v-for="(name, index) in item.students" :key="index">
                  {{ name }} ,
                </span>
              </td>
              <td>
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
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Subjects } from "../../../imports/api/Models";
export default {
  data() {
    return {
      dialog: false,
      confirmDialog: false,
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
    deleteInfo() {
      Meteor.call("deleteSubjectInfo", this._id, (err, res) => {
        if (err) {
          console.log("Something went wrong");
        } else {
          this.isOpen = true;
          this.text = "Deleted successfully";
        }
      });
      this.confirmDialog = false;
    },
    openConfirmModal(subjectId) {
      this.confirmDialog = true;
      this._id = subjectId;
    },
  },
};
</script>

<style scoped>
</style>