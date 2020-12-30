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
              <td>
                <span v-for="(name, index) in item.students" :key="index">
                  {{ name }} ,
                </span>
              </td>
              <td>
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
  },
};
</script>

<style scoped>
</style>