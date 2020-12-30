<template>
  <div>
    <v-app-bar color="amber--text text--accent-4" dense dark>
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
</style>