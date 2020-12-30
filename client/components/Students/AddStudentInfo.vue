<template>
  <v-container>
    <v-subheader> Add student information </v-subheader>
    <v-form ref="form" v-model="valid" @submit.prevent="addInformation">
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="name"
            label="Name"
            :rules="nameRules"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            type="number"
            v-model="phone_number"
            label="Phone number"
            :rules="numberRules"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
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
                outlined
                :rules="dateRules"
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
      <div class="d-flex justify-center">
        <v-btn
          :disabled="!valid"
          @click="addInformation"
          elevation="2"
          color="blue darken-2"
          class="white--text ttn"
          >Add information</v-btn
        >
      </div>
    </v-form>
  </v-container>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Students } from "../../../imports/api/Models";
export default {
  data: () => ({
    name: "",
    email: "",
    phone_number: "",
    date: null,
    menu: false,
    valid: false,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    numberRules: [(v) => !!v || "Phone number is required"],
    dateRules: [(v) => !!v || "Birthday is required"],
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    emptyTextField() {
      (this.name = ""),
        (this.email = ""),
        (this.phone_number = ""),
        (this.date = "");
    },
    addInformation() {
      this.$refs.form.validate();
      const information = {
        name: this.name,
        email: this.email,
        phone_number: this.phone_number,
        date: this.date,
      };
      Meteor.call("addStudentsInfo", information, (err, res) => {
        if (err) {
          console.log("show  error toast");
        } else {
          console.log("Created successfully");
          this.emptyTextField();
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