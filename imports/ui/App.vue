<template>
  <div>
    <p>{{ greeting }}</p>
    <p>{{ counter }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
      greeting: "Hello  world",
    };
  },
  methods: {
    increment() {
      this.counter++;
    },
    decrement() {
      this.counter--;
    },
  },
};
</script>

<style scoped>
</style>