<template>
  <v-container>
    <AddStudentInfo />
    <br />
    <div class="display-1">Information</div>
    <ViewStudentInformation />
  </v-container>
</template>

<script>
import AddStudentInfo from "../components/Students/AddStudentInfo";
import ViewStudentInformation from "../components/Students/ViewStudentInformation";
export default {
  components: {
    AddStudentInfo,
    ViewStudentInformation,
  },
};
</script>

<style  scoped>
</style>