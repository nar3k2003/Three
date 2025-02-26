<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<style scoped>
  header {
    color: rgb(0, 0, 0);
    padding: 10px;
  }

  nav {
    display: flex;
    justify-content: center;
  }

  nav a {
    color: rgb(0, 0, 0);
    margin: 0 10px;
    text-decoration: none;
  }

  nav a:hover {
    text-decoration: underline;
  }
</style>
