<template>
  <div>
    <AddStudentInfo />
    <ViewStudentInformation />
  </div>
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