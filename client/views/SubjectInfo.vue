<template>
  <v-container>
    <AddSubjectInfo />
    <br />
    <ViewSubjectInfo />
  </v-container>
</template>

<script>
import AddSubjectInfo from "../components/Subjects/AddSubjectInfo";
import ViewSubjectInfo from "../components/Subjects/ViewSubjectInfo";
export default {
  components: {
    AddSubjectInfo,
    ViewSubjectInfo,
  },
};
</script>

<style scoped>
</style>