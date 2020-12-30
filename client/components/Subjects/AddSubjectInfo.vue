<template>
  <v-form>
    <v-subheader>Add subject information</v-subheader>
    <v-row>
      <v-col cols="12" sm="6">
        <v-text-field v-model="subject_name" outlined label="Subject name">
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-autocomplete
          v-model="students"
          :items="items"
          outlined
          chips
          small-chips
          label="Student name"
          multiple
        ></v-autocomplete>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    items: ["foo", "bar", "fizz", "buzz"],
    students: "",
    subject_name: "",
  }),
};
</script>

