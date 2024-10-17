<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'
// import JSON from './components/JSON.vue'
// import Form from './components/Form.vue'
//import router from './router/index'
import { computed } from 'vue'
import BHeader from './components/BHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showHeader = computed(() => {
  console.log('router1', router.currentRoute)
  console.log('router2', router.currentRoute.value.name)
  return router.currentRoute.value.name !== 'CountBookAPI'
})
</script>

<template>
  <div>
    <header v-if="showHeader">
      <BHeader />
    </header>
  </div>
  <main>
    <!-- <LibraryRegistrationForm /> -->
    <!-- <JSONLab /> -->
    <router-view></router-view>
  </main>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */

.about {
  text-align: center;
}
</style>
