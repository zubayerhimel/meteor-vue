<template>
  <div>
    <v-app-bar rounded="lg">
      <v-toolbar-title>Meteor-Vue</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link to="/">
        <v-toolbar-items>Student Info</v-toolbar-items>
      </router-link>
      <router-link to="/subjectinfo">
        <span>Subject Info</span>
      </router-link>
    </v-app-bar>
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  color: rgb(18, 100, 223);
  font-weight: bold;
  text-decoration: none;
  margin: 0 10px;
}
a:active {
  color: rgb(22, 212, 117);
}
</style>